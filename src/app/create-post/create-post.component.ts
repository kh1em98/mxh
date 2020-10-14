import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post/post.service';
import { CanComponentDeactivate } from '../core/can-deactive-guard.service';
import { Observable, noop } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  error: string = null;
  isLoading: boolean = false;
  createPostForm: FormGroup = null;
  formData: FormData = new FormData();

  @Input() user;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      content: new FormControl('', Validators.required),
      image: new FormControl(null, [this.requiredFileType.bind(this)]),
    });

    this.createPostForm.valueChanges.subscribe(() => {
      this.postService.canNewsFeedDeactivate.post = !this.createPostForm.valid;
    });
  }

  onCreatePost() {
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
        .pipe(
          tap(() => {
            this.createPostForm.reset();
            this.isLoading = false;
          })
        )
        .subscribe(noop, (errorMessage) => {
          this.error = errorMessage;
        });
    }
  }

  requiredFileType(
    control: FormControl,
    type = ['png', 'jpg', 'jpeg']
  ): { [s: string]: boolean } {
    const img = control.value;

    if (img) {
      console.log(this.createPostForm.get('image'));
      const extension = img.split('.')[1].toLowerCase();
      if (type.indexOf(extension) === -1) {
        return {
          requiredFileType: true,
        };
      } else {
        return null;
      }
    }

    return null;
  }

  uploadImg(event) {
    this.formData.append('image', event.target.files[0]);
    this.postService.uploadImg(this.formData);
  }

  closeAlertError() {
    this.error = '';
  }
}
