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

@Injectable({
  providedIn: 'root',
})
export class PostService {
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
      })
    );
  }

  likePost(postId, user: User) {
    return this.updatePostsServer.likePost(postId).pipe(
      tap(() => {
        this.update.next(operationLike(postId, user._id));
      })
    );
  }

  unlikePost(postId, user: User) {
    return this.updatePostsServer.unlikePost(postId).pipe(
      tap(() => {
        this.update.next(operationUnlike(postId, user._id));
      })
    );
  }

  retweetPost(postId, user: User) {
    return this.updatePostsServer.retweetPost(postId).pipe(
      tap(() => {
        this.update.next(operationRetweet(postId, user._id));
      })
    );
  }

  deletePost(postId) {
    return this.updatePostsServer.deletePost(postId).pipe(
      tap(() => {
        this.update.next(operationDeletePost(postId));
      })
    );
  }

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
      })
    );
  }

  deleteComment({ postId, commentId }) {
    return this.updatePostsServer.deleteComment(postId, commentId).pipe(
      tap(() => {
        this.update.next(operationDeleteComment(postId, commentId));
      })
    );
  }
}
