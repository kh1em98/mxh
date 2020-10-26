import { PostService } from './../../post/post.service';
import { CanComponentDeactivate } from './../../core/can-deactive-guard.service';
import { Post } from './../../post/post.model';
import { take } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from '../../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile, WallService } from '../wall.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
})
export class WallComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  isLoading: boolean = false;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private wallService: WallService,
    private router: Router,
    private postService: PostService
  ) {}

  isMe: boolean = false;
  me: User = null;
  userProfile: UserProfile = null;
  wallPosts: Observable<Post[]> = null;
  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user: User) => {
      this.me = user;
    });

    this.route.params.subscribe((params) => {
      if (params.username === this.me.username) {
        this.isMe = true;
      }

      if (
        this.wallService.userProfile === null ||
        params.username !== this.wallService.userProfile.username
      ) {
        this.isLoading = true;
        this.wallService.getUserProfile(params.username).subscribe(
          () => {
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
            this.router.navigate(['/not-found']);
          }
        );
      }
    });

    this.userSubscription = this.wallService.userProfileChanged.subscribe(
      (userProfile: UserProfile) => {
        this.userProfile = userProfile;
      }
    );

    this.wallPosts = this.wallService.wallPosts;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (
      this.postService.canPostDeactivate.post &&
      this.postService.canPostDeactivate.comment
    ) {
      this.postService.canPostDeactivate = {
        post: true,
        comment: true,
      };
      return true;
    }
    return confirm(
      'Bạn chưa hoàn thành post hoặc comment. Bạn có chắc muốn đi tiếp?'
    );
  }
}
