import { IPostOperation, PostService } from './../post/post.service';
import { Post } from './../post/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { scan, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { operationLoadPosts } from '../post/util-post';

@Injectable({
  providedIn: 'root',
})
export class NewsFeedService implements OnDestroy {
  posts: Observable<Post[]> = null;

  canLoadMore: boolean = true;

  constructor(private http: HttpClient, private postService: PostService) {}

  initNewsFeed(postsSkip: number, postsPerScroll: number) {
    return this.fetchPosts(postsSkip, postsPerScroll);
  }

  fetchPosts(postsSkip: number, postsPerScroll: number) {
    return this.http.get(`/api/post/${postsPerScroll}/${postsSkip}`).pipe(
      tap((posts: any) => {
        if (posts.length === 0) {
          this.canLoadMore = false;
        } else {
          this.postService.update.next(operationLoadPosts(posts));
        }
      })
    );
  }

  ngOnDestroy() {}
}
