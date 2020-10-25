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

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
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
    private postService: PostService
  ) {}

  ngOnInit(): void {
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
      this.postService.canPostDeactivate.post &&
      this.postService.canPostDeactivate.comment
    ) {
      return true;
    }
    return confirm(
      'Bạn chưa hoàn thành post hoặc comment. Bạn có chắc muốn đi tiếp?'
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
