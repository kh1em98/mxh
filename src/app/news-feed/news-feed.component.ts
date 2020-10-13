import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import {
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  take,
  tap,
} from 'rxjs/operators';
import { User } from '../shared/user.model';
import { PostService } from '../post/post.service';
import { Post } from '../post/post.model';
import { HttpClient } from '@angular/common/http';
import { scrollToBottom$ } from '../shared/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
})
export class NewsFeedComponent implements OnInit {
  subscription: Subscription;
  allPost: Post[] = [];
  user: User = null;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.initNewsFeed();

    this.postService.postsChanged.subscribe((allPost) => {
      this.allPost = allPost;
    });

    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });

    // Load more post...
    if (this.postService.needLoadMoreNewsFeed) {
      this.subscription = scrollToBottom$
        .pipe(
          exhaustMap(() => {
            return this.postService.fetchPosts();
          }),
          tap((response: any) => {
            if (response.length === 0) {
              this.subscription.unsubscribe();
            }
          })
        )
        .subscribe();
    }
  }
}
