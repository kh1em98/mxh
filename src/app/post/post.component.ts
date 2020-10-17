import { Component, Input, OnInit } from '@angular/core';
import { Post } from './post.model';
import { AuthService } from '../core/auth.service';
import { take, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { PostService } from './post.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { noop } from 'rxjs';
import { UserProfile } from '../user/wall.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    // Animation fade notification
    trigger('fade', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),

      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(350),
      ]),

      transition('* => void', [
        animate(
          350,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class PostComponent implements OnInit {
  isLoading: boolean = false;
  notification: { message: string; typeNotification: string } = null;
  @Input() post: Post;
  @Input() isPostRetweeted = false;
  @Input() userRetweeted: UserProfile = null;
  isLiked: boolean = false;
  isRetweeted: boolean = false;
  isMyPost: boolean = false;
  user: User = null;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });

    this.checkIsMyPost();
    this.checkIsPostLiked();
    this.checkIsPostRetweeted();
  }

  onToggleLike() {
    if (this.isLiked) {
      this.isLiked = false;
      this.postService
        .unlikePost({ userId: this.user._id, postId: this.post._id })
        .subscribe(noop, (error) => this.showNotificationError(error));
    } else {
      this.isLiked = true;
      this.postService
        .likePost({ userId: this.user._id, postId: this.post._id })
        .subscribe(noop, (error) => this.showNotificationError(error));
    }
  }

  onRetweet() {
    if (this.isRetweeted) {
      this.showNotificationError('Bạn đã chia sẻ bài viết rồi');
    } else {
      this.isRetweeted = true;
      this.notification = {
        message: 'Chia sẻ bài viết thành công',
        typeNotification: 'alert-success',
      };
      this.postService
        .retweetPost({
          postId: this.post._id,
          userId: this.user._id,
        })
        .subscribe();
    }
    setTimeout(() => {
      this.notification = null;
    }, 1500);
  }

  onDeletePost() {
    this.isLoading = true;
    this.postService
      .deletePost({ postId: this.post._id })
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe(noop, (error) => this.showNotificationError(error));
  }

  checkIsMyPost() {
    this.isMyPost = this.post.userPost._id === this.user._id;
  }

  checkIsPostLiked() {
    this.isLiked =
      this.post.likes.findIndex((user) => user === this.user._id) !== -1;
  }

  checkIsPostRetweeted() {
    this.isRetweeted =
      this.post.retweets.findIndex((user) => user === this.user._id) !== -1;
  }

  showNotificationError(error) {
    this.notification = {
      message: error,
      typeNotification: 'alert-danger',
    };

    setTimeout(() => {
      this.notification = null;
    }, 1500);
  }
}
