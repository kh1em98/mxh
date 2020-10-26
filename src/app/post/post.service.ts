<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post.model';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from '../shared/user.model';
import { tap, catchError, concatMap } from 'rxjs/operators';
=======
import { UpdatePostsServer } from './updatePostsServer.service';
import { Injectable, OnInit } from '@angular/core';
import { Post } from './post.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { tap, catchError, map } from 'rxjs/operators';
import {
  createNewPost,
  operationLoadPosts,
  operationCreateComment,
  operationCreatePost,
  operationDeleteComment,
  operationDeletePost,
  operationLike,
  operationRetweet,
  operationUnlike,
} from './util-post';

export interface IPostOperation extends Function {
  (posts: Post[]): Post[];
}
>>>>>>> prod

@Injectable({
  providedIn: 'root',
})
export class PostService {
<<<<<<< HEAD
  canNewsFeedDeactivate: {
=======
  canPostDeactivate: {
>>>>>>> prod
    post: boolean;
    comment: boolean;
  } = {
    post: true,
    comment: true,
  };

<<<<<<< HEAD
  needLoadMoreNewsFeed: boolean = true;
  postPerScroll = 3;
  postSkip = 0;
  postsChanged = new BehaviorSubject<Post[]>([]);
  allPost: Post[] = [];
  user: User = null;

  constructor(private http: HttpClient) {}

  createPost(post) {
    const { content, name, username, avatar, _idUserPost, images } = post;

    const imagesToSend = JSON.stringify(images);
    console.log('Images : ', images);
    console.log(imagesToSend);

    return this.http.post('/api/post', { content, images: imagesToSend }).pipe(
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
          [],
          images
        );
        this.allPost.unshift(newPost);
        this.postsChanged.next(this.allPost.slice());
=======
  allPost: Post[] = [];

  user: User = null;

  posts: Observable<Post[]> = null;

  update = new Subject();
  constructor(private updatePostsServer: UpdatePostsServer) {}

  createPost(post, user: User) {
    return this.updatePostsServer.createPost(post).pipe(
      tap(() => {
        const newPost = createNewPost(post, user);
        this.update.next(operationCreatePost(newPost));
>>>>>>> prod
      })
    );
  }

<<<<<<< HEAD
  uploadImg(formData: FormData) {
    return this.http.post('/api/post/uploadImg', formData);
  }

  createComment(info) {
    const { postId, content, name, username, avatar, userId } = info;
    return this.http.post('/api/post/comment', { postId, content }).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        console.log('Post id : ', postId);
        const postIndex = this.allPost.findIndex((post) => post._id === postId);

        console.log('Post index : ', postIndex);
        console.log(this.allPost);
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
=======
  likePost(postId, user: User) {
    return this.updatePostsServer.likePost(postId).pipe(
      tap(() => {
        this.update.next(operationLike(postId, user._id));
>>>>>>> prod
      })
    );
  }

<<<<<<< HEAD
  likePost({ userId, postId }) {
    return this.http.post('/api/post/like', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        /*         const postIndex = this.allPost.findIndex((post) => post._id === postId);

        this.allPost[postIndex].likes.push(userId);

        this.postsChanged.next(this.allPost.slice()); */
=======
  unlikePost(postId, user: User) {
    return this.updatePostsServer.unlikePost(postId).pipe(
      tap(() => {
        this.update.next(operationUnlike(postId, user._id));
>>>>>>> prod
      })
    );
  }

<<<<<<< HEAD
  unlikePost({ userId, postId }) {
    return this.http.post('/api/post/unlike', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        /*  const postIndex = this.allPost.findIndex((post) => post._id === postId);

        const userToDeleteIndex = this.allPost[postIndex].likes.findIndex(
          (userLike) => userLike === userId
        );

        this.allPost[postIndex].likes.splice(userToDeleteIndex, 1);

        this.postsChanged.next(this.allPost.slice()); */
=======
  retweetPost(postId, user: User) {
    return this.updatePostsServer.retweetPost(postId).pipe(
      tap(() => {
        this.update.next(operationRetweet(postId, user._id));
>>>>>>> prod
      })
    );
  }

<<<<<<< HEAD
  retweetPost({ postId, userId }) {
    return this.http.post('/api/post/retweet', { postId }).pipe(
      catchError(this.handleError),
      tap(() => {
        const postIndex = this.allPost.findIndex((post) => post._id === postId);
        this.allPost[postIndex].retweets.push(userId);

        this.postsChanged.next(this.allPost.slice());
=======
  deletePost(postId) {
    return this.updatePostsServer.deletePost(postId).pipe(
      tap(() => {
        this.update.next(operationDeletePost(postId));
>>>>>>> prod
      })
    );
  }

<<<<<<< HEAD
  deletePost({ postId }) {
    return this.http.delete(`/api/post/${postId}`).pipe(
      catchError(this.handleError),
      tap(() => {
        const postIndex = this.allPost.findIndex((post) => post._id === postId);
        this.allPost.splice(postIndex, 1);

        this.postsChanged.next(this.allPost.slice());
=======
  uploadImg(formData: FormData) {
    return this.updatePostsServer.uploadImg(formData);
  }

  createComment(info, user: User) {
    const { postId, content, _id } = info;

    return this.updatePostsServer.createComment(postId, content, _id).pipe(
      tap(() => {
        this.update.next(
          operationCreateComment(postId, { _id, content }, user)
        );
>>>>>>> prod
      })
    );
  }

  deleteComment({ postId, commentId }) {
<<<<<<< HEAD
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
=======
    return this.updatePostsServer.deleteComment(postId, commentId).pipe(
      tap(() => {
        this.update.next(operationDeleteComment(postId, commentId));
      })
    );
  }
>>>>>>> prod
}
