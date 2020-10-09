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

    this.isLiked =
      this.post.likes.findIndex((user) => user === this.user._id) !== -1;
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
}
