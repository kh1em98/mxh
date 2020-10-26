<<<<<<< HEAD
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
=======
import { Component, Input, OnInit } from '@angular/core';
>>>>>>> prod
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post/post.service';
import { Observable, noop } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { requiredFileType } from '../core/validations';
<<<<<<< HEAD
import { HttpEventType } from '@angular/common/http';
=======
import mongoose from 'mongoose';
>>>>>>> prod

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  isOpenAddPhoto: boolean = false;
  error: string = null;
  isLoading: boolean = false;
  createPostForm: FormGroup = null;
  formData: FormData = new FormData();

  @Input() user;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      content: new FormControl('', Validators.required),
      image: new FormControl(null, [requiredFileType]),
    });

    this.createPostForm.valueChanges.subscribe(() => {
<<<<<<< HEAD
      this.postService.canNewsFeedDeactivate.post = !this.createPostForm.valid;
=======
      this.postService.canPostDeactivate.post = !this.createPostForm.get(
        'content'
      ).value;
>>>>>>> prod
    });
  }

  onCreatePost() {
    if (this.createPostForm.valid) {
      this.isLoading = true;

      let createPost$: Observable<any>;

      const postObject = this.createPostObject();

      if (this.createPostForm.get('image').value) {
<<<<<<< HEAD
        console.log('Co anh');
=======
>>>>>>> prod
        // Nếu có ảnh -> upload ảnh trước, lấy url ảnh trả về để push vào images của post
        createPost$ = this.postService.uploadImg(this.formData).pipe(
          concatMap((response: any) => {
            const imageUrl = response.imageUrl;
            postObject.images.push(imageUrl);
<<<<<<< HEAD
            return this.postService.createPost(postObject);
          })
        );
      } else {
        createPost$ = this.postService.createPost(postObject);
=======
            return this.postService.createPost(postObject, this.user);
          })
        );
      } else {
        createPost$ = this.postService.createPost(postObject, this.user);
>>>>>>> prod
      }

      createPost$
        .pipe(
          tap(() => {
            this.reset();
          })
        )
        .subscribe(noop, (errorMessage) => {
          this.error = errorMessage;
        });
    }
  }

  uploadImg(event) {
    this.formData.append('image', event.target.files[0]);
  }

  closeAlertError() {
    this.error = '';
  }

  openAddPhoto() {
    this.isOpenAddPhoto = true;
  }

  createPostObject() {
    return {
<<<<<<< HEAD
=======
      _id: new mongoose.Types.ObjectId(),
>>>>>>> prod
      _idUserPost: this.user._id,
      content: this.createPostForm.get('content').value,
      name: this.user.name,
      avatar: this.user.avatar,
      username: this.user.username,
      images: [],
    };
  }

  reset() {
    this.isOpenAddPhoto = false;
    this.formData = new FormData();
    this.createPostForm.reset();
    this.isLoading = false;
  }
}
