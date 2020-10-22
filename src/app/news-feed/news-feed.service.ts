import { IPostOperation, PostService } from './../post/post.service';
import { Post } from './../post/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { scan, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { operationAddPosts } from '../post/util-post';

const initialPosts: Post[] = [];

@Injectable({
  providedIn: 'root',
})
export class NewsFeedService {
  posts: Observable<Post[]> = null;

  canNewsFeedDeactivate: {
    post: boolean;
    comment: boolean;
  } = {
    post: true,
    comment: true,
  };

  canLoadMore: boolean = true;

  constructor(private http: HttpClient, private postService: PostService) {
    this.posts = this.postService.update.pipe(
      scan((posts: Post[], operation: IPostOperation) => {
        return operation(posts);
      }, initialPosts)
    );
  }

  initNewsFeed(postsSkip: number, postsPerScroll: number) {
    return this.fetchPosts(postsSkip, postsPerScroll);
  }

  fetchPosts(postsSkip: number, postsPerScroll: number) {
    console.log(`Post skips : ${postsSkip}, post scroll : ${postsPerScroll}`);
    return this.http.get(`/api/post/${postsPerScroll}/${postsSkip}`).pipe(
      tap((posts: any) => {
        if (posts.length === 0) {
          this.canLoadMore = false;
        } else {
          this.postService.update.next(operationAddPosts(posts));
        }
      })
    );
  }
}
