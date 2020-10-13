import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post.model';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from '../shared/user.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  needLoadMoreNewsFeed: boolean = true;
  postPerScroll = 3;
  postSkip = 0;
  postsChanged = new BehaviorSubject<Post[]>([]);
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

  createComment(info) {
    const { postId, content, name, username, avatar, userId } = info;
    return this.http.post('/api/post/comment', { postId, content }).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        const postIndex = this.allPost.findIndex((post) => post._id === postId);

        this.allPost[postIndex].comments.unshift({
          _id: response.newCommentId,
          timeCreated: new Date(),
          content,
          userComment: {
            _id: userId,
            name,
            username,
            avatar,
          },
        });

        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  likePost({ userId, postId }) {
    return this.http.post('/api/post/like', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        const postIndex = this.allPost.findIndex((post) => post._id === postId);

        this.allPost[postIndex].likes.push(userId);

        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  unlikePost({ userId, postId }) {
    return this.http.post('/api/post/unlike', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        const postIndex = this.allPost.findIndex((post) => post._id === postId);

        const userToDeleteIndex = this.allPost[postIndex].likes.findIndex(
          (userLike) => userLike === userId
        );

        this.allPost[postIndex].likes.splice(userToDeleteIndex, 1);

        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  retweetPost({ postId, userId }) {
    return this.http.post('/api/post/retweet', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        const postIndex = this.allPost.findIndex((post) => post._id === postId);
        this.allPost[postIndex].retweets.push(userId);

        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  deletePost({ postId }) {
    return this.http.delete(`/api/post/${postId}`).pipe(
      catchError(this.handleError),
      tap(() => {
        const postIndex = this.allPost.findIndex((post) => post._id === postId);
        this.allPost.splice(postIndex, 1);

        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  deleteComment({ postId, commentId }) {
    return this.http.delete(`/api/post/comment/${postId}/${commentId}`).pipe(
      catchError(this.handleError),
      tap(() => {
        const indexPost = this.allPost.findIndex((post) => post._id === postId);
        const indexComment = this.allPost[indexPost].comments.findIndex(
          (comment) => comment._id === commentId
        );

        this.allPost[indexPost].comments.splice(indexComment, 1);
        this.postsChanged.next(this.allPost.slice());
      })
    );
  }

  fetchAllPosts() {
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

  fetchPosts() {
    return this.http
      .get(`/api/post/${this.postPerScroll}/${this.postSkip}`)
      .pipe(
        tap((posts: any) => {
          if (posts.length === 0) {
            this.needLoadMoreNewsFeed = false;
          } else {
            this.postSkip += 3;
            this.allPost = [...this.allPost, ...posts];
            this.postsChanged.next(this.allPost.slice());
          }
        })
      );
  }

  initNewsFeed() {
    if (this.allPost.length === 0) {
      this.fetchPosts().subscribe();
    }
  }

  handleError(errorRes: HttpErrorResponse) {
    const errorMessage = errorRes.error.message;

    if (typeof errorMessage === 'string') {
      return throwError(errorMessage);
    }
    return throwError('Lỗi không xác định');
  }
}
