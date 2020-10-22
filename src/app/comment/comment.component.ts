import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  error = '';
  isLoading: boolean = false;
  @Input() comment;
  @Input() userId: string;
  @Input() postId: string;
  @Input() userPostId: string;
  isMyComment: boolean = false;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.checkIsMyComment();
  }

  checkIsMyComment() {
    this.isMyComment = this.userId === this.comment.userComment._id;
  }

  onDeleteComment() {
    this.isLoading = true;
    this.postService
      .deleteComment({
        postId: this.postId,
        commentId: this.comment._id,
      })
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe(noop, (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
      });
  }

  closeAlertError() {
    this.error = '';
  }
}
