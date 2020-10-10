import { Component, Input, OnInit } from '@angular/core';
import { Post } from './post.model';
import { AuthService } from '../core/auth.service';
import { take } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  notification: { message: string; typeNotification: string } = null;
  @Input() post: Post;
  isLiked: boolean = false;
  isRetweeted: boolean = false;
  user: User = null;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });

    this.isPostLiked();
  }

  isPostLiked() {
    this.isLiked =
      this.post.likes.findIndex((user) => user === this.user._id) !== -1;
  }

  isPostRetweeted() {
    this.isRetweeted =
      this.post.retweets.findIndex((user) => user === this.user._id) !== -1;
  }

  onToggleLike() {
    console.log(this.isLiked);
    if (this.isLiked) {
      this.isLiked = false;
      this.postService
        .unlikePost({ userId: this.user._id, postId: this.post._id })
        .subscribe();
    } else {
      this.isLiked = true;
      this.postService
        .likePost({ userId: this.user._id, postId: this.post._id })
        .subscribe();
    }
  }

  onRetweet() {
    if (this.isRetweeted) {
      this.notification = {
        message: 'Bạn đã chia sẻ bài viết rồi',
        typeNotification: 'alert-danger',
      };
      console.log('Ahihi');
    } else {
      this.isRetweeted = true;
      this.notification = {
        message: 'Chia sẻ bài viết thành công',
        typeNotification: 'alert-success',
      };
      console.log('Ahuhu');
    }
  }
}
