<<<<<<< HEAD
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
import { Subscription, Observable } from 'rxjs';
import { CanComponentDeactivate } from '../core/can-deactive-guard.service';
import { FormGroup } from '@angular/forms';

=======
import { PostService, IPostOperation } from './../post/post.service';
import { NewsFeedService } from './news-feed.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { exhaustMap, scan, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { Post } from '../post/post.model';
import { scrollToBottom$ } from '../shared/utils';
import { Subscription, Observable, pipe } from 'rxjs';
import { CanComponentDeactivate } from '../core/can-deactive-guard.service';
import { FormGroup } from '@angular/forms';

const initialPosts: Post[] = [];

>>>>>>> prod
@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
<<<<<<< HEAD
})
export class NewsFeedComponent implements OnInit, CanComponentDeactivate {
  createPostForm: FormGroup;

  subscription: Subscription;
  allPost: Post[] = [];
  user: User = null;
  constructor(
    private authService: AuthService,
=======
  providers: [NewsFeedService],
})
export class NewsFeedComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  createPostForm: FormGroup;
  postsPerScroll = 3;
  postsSkip = 0;

  posts: Observable<Post[]> = null;

  subscription: Subscription;
  postSubscription: Subscription;

  user: User = null;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private newsFeedService: NewsFeedService,
>>>>>>> prod
    private postService: PostService
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
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
=======
    this.authService.user.subscribe((user: User) => {
      this.user = user;
    });

    this.posts = this.postService.update.pipe(
      scan((posts: Post[], operation: IPostOperation) => {
        return operation(posts);
      }, initialPosts),
    );

    this.newsFeedService
      .initNewsFeed(this.postsSkip, this.postsPerScroll)
      .subscribe(() => {
        this.postsSkip += 3;
      });

    // Load more post...
    if (this.newsFeedService.canLoadMore) {
      this.subscription = scrollToBottom$
        .pipe(
          exhaustMap(() => {
            return this.newsFeedService.fetchPosts(
              this.postsSkip,
              this.postsPerScroll
            );
          }),
          tap((response: any) => {
            this.postsSkip += 3;
>>>>>>> prod
            if (response.length === 0) {
              this.subscription.unsubscribe();
            }
          })
        )
        .subscribe();
    }
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (
<<<<<<< HEAD
      this.postService.canNewsFeedDeactivate.post &&
      this.postService.canNewsFeedDeactivate.comment
=======
      this.postService.canPostDeactivate.post &&
      this.postService.canPostDeactivate.comment
>>>>>>> prod
    ) {
      return true;
    }
    return confirm(
      'Bạn chưa hoàn thành post hoặc comment. Bạn có chắc muốn đi tiếp?'
    );
  }
<<<<<<< HEAD
=======

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
>>>>>>> prod
}
