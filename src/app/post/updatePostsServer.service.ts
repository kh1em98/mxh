import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdatePostsServer {
  constructor(private http: HttpClient) {}

  createPost(post: any) {
    const { content, images, _id } = post;
    const imagesToSend = JSON.stringify(images);

    return this.http
      .post('/api/post', {
        content,
        images: imagesToSend,
        _id,
      })
      .pipe(catchError(this.handleError));
  }

  uploadImg(formData: FormData) {
    return this.http
      .post('/api/post/uploadImg', formData)
      .pipe(catchError(this.handleError));
  }

  createComment(postId: string, content: string, _id: any) {
    return this.http
      .post('/api/post/comment', {
        postId,
        content,
        _id,
      })
      .pipe(catchError(this.handleError));
  }

  likePost(postId: string) {
    return this.http
      .post('/api/post/like', { postId })
      .pipe(catchError(this.handleError));
  }

  unlikePost(postId: string) {
    return this.http
      .post('/api/post/unlike', { postId })
      .pipe(catchError(this.handleError));
  }

  retweetPost(postId: string) {
    return this.http
      .post('/api/post/retweet', { postId })
      .pipe(catchError(this.handleError));
  }

  deletePost(postId: string) {
    return this.http
      .delete(`/api/post/${postId}`)
      .pipe(catchError(this.handleError));
  }

  deleteComment(postId: string, commentId: string) {
    return this.http
      .delete(`/api/post/comment/${postId}/${commentId}`)
      .pipe(catchError(this.handleError));
  }

  handleError(errorRes: HttpErrorResponse) {
    const errorMessage = errorRes.error.message;

    if (typeof errorMessage === 'string') {
      return throwError(errorMessage);
    }
    return throwError('Lỗi không xác định');
  }
}
