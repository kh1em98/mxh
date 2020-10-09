import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';
import { User } from '../shared/user.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsChanged = new Subject<Post[]>();
  allPost: Post[] = [];
  user: User = null;

  constructor(private http: HttpClient) {}

  createPost(post: {
    content: string;
    name: string;
    username: string;
    avatar: string;
  }) {
    const { content, name, username, avatar } = post;

    console.log('Bai dinh post : ', post);

    return this.http.post('/api/post', { content }).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        const newPost = new Post(
          response.newPostId,
          {
            name: name,
            avatar: avatar,
            username: username,
          },
          content,
          new Date(),
          [],
          [],
          []
        );
        this.allPost.unshift(newPost);
        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  createComment(comment) {
    const { postId, content, name, username, avatar } = comment;
    return this.http.post('/api/post/comment', { postId, content }).pipe(
      catchError(this.handleError),
      tap(() => {
        for (let i = 0; i < this.allPost.length; i++) {
          if (this.allPost[i]._id === postId) {
            this.allPost[i].comments.unshift({
              timeCreated: new Date(),
              content,
              userComment: {
                name,
                username,
                avatar,
              },
            });
            break;
          }
        }

        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  fetchPosts() {
    this.http
      .get('/api/post')
      .pipe(
        tap((allPost: any) => {
          this.allPost = allPost;
          this.postsChanged.next(this.allPost.slice());
        })
      )
      .subscribe();
  }

  handleError(errorRes: HttpErrorResponse) {
    const errorMessage = errorRes.error.message;

    console.log(typeof errorMessage);

    if (typeof errorMessage === 'string') {
      return throwError(errorMessage);
    }
    return throwError('Lỗi không xác định');
  }
}
