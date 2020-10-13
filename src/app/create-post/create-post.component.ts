import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post/post.service';
import { CanComponentDeactivate } from '../core/can-deactive-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, CanComponentDeactivate {
  error: string = null;
  isLoading: boolean = false;
  createPostForm: FormGroup = null;
  @Input() user;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      content: new FormControl('', Validators.required),
    });

    this.createPostForm.valueChanges.subscribe(() => {
      this.postService.canDeactivate.post = !this.createPostForm.valid;
    });
  }

  onCreatePost() {
    console.log('Create post');
    if (this.createPostForm.valid) {
      this.isLoading = true;
      this.postService
        .createPost({
          ...this.createPostForm.value,
          _idUserPost: this.user._id,
          name: this.user.name,
          avatar: this.user.avatar,
          username: this.user.username,
        })
        .subscribe(
          () => {
            this.createPostForm.reset();
            this.isLoading = false;
          },
          (errorMessage) => {
            this.createPostForm.reset();
            this.isLoading = false;
            this.error = errorMessage;
          }
        );
    }
  }

  closeAlertError() {
    this.error = '';
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.createPostForm.value) {
      console.log('Co value : ', this.createPostForm.value);
      return false;
    }
    return true;
  }
}
