import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { take } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { PostService } from '../post/post.service';
import { Post } from '../post/post.model';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
})
export class NewsFeedComponent implements OnInit {
  allPost: Post[] = [];
  user: User = null;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.fetchPosts();

    this.postService.postsChanged.subscribe((allPost) => {
      this.allPost = allPost;
    });

    this.authService.user.pipe(take(1)).subscribe((user) => (this.user = user));
  }
}
