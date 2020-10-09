import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { AuthService } from '../../core/auth.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../post/post.service';

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
  }

  onCreateComment() {
    this.isLoading = true;
    this.postService
      .createComment({
        ...this.commentForm.value,
        postId: this.postId,
        name: this.user.name,
        avatar: this.user.avatar,
        username: this.user.username,
      })
      .subscribe(
        () => {
          this.commentForm.reset();
          this.isLoading = false;
        },
        (errorMessage) => {
          this.commentForm.reset();
          this.isLoading = false;
          this.error = errorMessage;
        }
      );
  }

  closeAlertError() {
    this.error = '';
  }
}