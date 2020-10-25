import { PostService, IPostOperation } from './../post/post.service';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { scan, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Post } from '../post/post.model';
import { operationLoadPosts } from '../post/util-post';

const initialPosts: Post[] = [];

export interface UserProfile {
  _id: string;
  name: string;
  username: string;
  avatar: string;
  bigAvatar: string;
  wallPosts: [];
  bio?: string;
}

@Injectable({
  providedIn: 'root',
})
export class WallService {
  userProfile: UserProfile = null;
  subscription: Subscription = null;

  wallPosts = new BehaviorSubject<Post[]>([]);

  userProfileChanged = new BehaviorSubject<UserProfile>(null);

  constructor(private http: HttpClient, private postService: PostService) {
    this.subscription = this.postService.update
      .pipe(
        scan((posts: Post[], operation: IPostOperation) => {
          return operation(posts);
        }, initialPosts)
      )
      .subscribe(this.wallPosts);
  }

  getUserProfile(username: string) {
    return this.http.get<User>(`/api/user/${username}`).pipe(
      tap((response: any) => {
        this.userProfile = this.createUserProfile(response.user);

        this.postService.update.next(
          operationLoadPosts(this.userProfile.wallPosts)
        );
        this.userProfileChanged.next(this.userProfile);
      })
    );
  }

  createUserProfile(userResponse): UserProfile {
    return {
      _id: userResponse._id,
      name: userResponse.name,
      username: userResponse.username,
      avatar: userResponse.avatar,
      bigAvatar: userResponse.bigAvatar,
      wallPosts: userResponse.wallPosts,
      bio: userResponse.bio ? userResponse.bio : '',
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
