import { IPostOperation } from './../post/post.service';
import { NewsFeedService } from './news-feed.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { exhaustMap, scan, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { PostService } from '../post/post.service';
import { Post } from '../post/post.model';
import { scrollToBottom$ } from '../shared/utils';
import { Subscription, Observable } from 'rxjs';
import { CanComponentDeactivate } from '../core/can-deactive-guard.service';
import { FormGroup } from '@angular/forms';

const initialPosts: Post[] = [];

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
})
export class NewsFeedComponent implements OnInit, CanComponentDeactivate {
  createPostForm: FormGroup;

  posts: Observable<Post[]> = null;

  subscription: Subscription;
  postSubscription: Subscription;

  user: User = null;
  constructor(
    private authService: AuthService,
    private postService: PostService,
    private newsFeedService: NewsFeedService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user: User) => {
      this.user = user;
    });

    this.newsFeedService.initNewsFeed();

    this.posts = this.postService.update.pipe(
      scan((posts: Post[], operation: IPostOperation) => {
        return operation(posts);
      }, initialPosts)
    );

    // Load more post...
    if (this.newsFeedService.canLoadMore) {
      this.subscription = scrollToBottom$
        .pipe(
          exhaustMap(() => {
            return this.newsFeedService.fetchPosts();
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

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (
      this.newsFeedService.canNewsFeedDeactivate.post &&
      this.newsFeedService.canNewsFeedDeactivate.comment
    ) {
      return true;
    }
    return confirm(
      'Bạn chưa hoàn thành post hoặc comment. Bạn có chắc muốn đi tiếp?'
    );
  }
}
