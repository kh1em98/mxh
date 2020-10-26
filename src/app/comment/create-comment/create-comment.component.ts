import { NewsFeedService } from './../../news-feed/news-feed.service';

import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { AuthService } from '../../core/auth.service';
import { take, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../post/post.service';
import { noop } from 'rxjs';
import mongoose from 'mongoose';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css'],
})
export class CreateCommentComponent implements OnInit {
  @Input() postId;
  user: User = null;
  commentForm: FormGroup = null;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl('', Validators.required),
    });

    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });

    this.commentForm.valueChanges.subscribe(() => {
      this.postService.canPostDeactivate.comment = !this.commentForm.get(
        'content'
      ).value;
    });
  }

  onCreateComment() {
    if (this.commentForm.valid) {
      this.isLoading = true;

      const _id = new mongoose.Types.ObjectId();

      this.postService
        .createComment(
          {
            _id,
            ...this.commentForm.value,
            postId: this.postId,
          },
          this.user
        )
        .pipe(
          tap(() => {
            this.isLoading = false;
            this.commentForm.reset();
          })
        )
        .subscribe(noop, (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
        });
    }
  }

  closeAlertError() {
    this.error = '';
  }
}
