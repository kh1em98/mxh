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
    _idUserPost: string;
    content: string;
    name: string;
    username: string;
    avatar: string;
  }) {
    const { content, name, username, avatar, _idUserPost } = post;

    return this.http.post('/api/post', { content }).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        const newPost = new Post(
          response.newPostId,
          {
            _id: _idUserPost,
            name,
            avatar,
            username,
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

  likePost({ userId, postId }) {
    return this.http.post('/api/post/like', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        for (let post of this.allPost) {
          if (post._id === postId) {
            post.likes.push(userId);
            break;
          }
        }
        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  unlikePost({ userId, postId }) {
    return this.http.post('/api/post/unlike', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        for (let post of this.allPost) {
          if (post._id === postId) {
            let indexItemToDelete = post.likes.findIndex(
              (userLike) => userLike === userId
            );
            post.likes.splice(indexItemToDelete, 1);
            break;
          }
        }
        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  retweetPost({ postId, userId }) {
    return this.http.post('/api/post/retweet', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        for (let post of this.allPost) {
          if (post._id === postId) {
            post.retweets.push(userId);
            break;
          }
        }
        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  deletePost({ postId }) {
    return this.http.delete(`/api/post/${postId}`).pipe(
      catchError(this.handleError),
      tap(() => {
        for (let i = 0; i < this.allPost.length; i++) {
          if (this.allPost[i]._id === postId) {
            this.allPost.splice(i, 1);
            break;
          }
        }
        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  fetchPosts() {
    console.log('Fetch post');
    this.http
      .get('/api/post')
      .pipe(
        tap((allPost: any) => {
          console.log('Da lay duoc het post : ', allPost);
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
