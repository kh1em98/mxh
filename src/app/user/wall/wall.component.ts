<<<<<<< HEAD
import { tap, take } from 'rxjs/operators';
=======
import { PostService } from './../../post/post.service';
import { CanComponentDeactivate } from './../../core/can-deactive-guard.service';
import { Post } from './../../post/post.model';
import { take } from 'rxjs/operators';
>>>>>>> prod
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from '../../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile, WallService } from '../wall.service';
<<<<<<< HEAD
import { noop, Subscription } from 'rxjs';
=======
import { Subscription, Observable } from 'rxjs';
>>>>>>> prod

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
})
<<<<<<< HEAD
export class WallComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  subscription: Subscription;
=======
export class WallComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  isLoading: boolean = false;
  userSubscription: Subscription;
  postSubscription: Subscription;
>>>>>>> prod

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private wallService: WallService,
<<<<<<< HEAD
    private router: Router
=======
    private router: Router,
    private postService: PostService
>>>>>>> prod
  ) {}

  isMe: boolean = false;
  me: User = null;
  userProfile: UserProfile = null;
<<<<<<< HEAD

=======
  wallPosts: Observable<Post[]> = null;
>>>>>>> prod
  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user: User) => {
      this.me = user;
    });

<<<<<<< HEAD
    this.subscription = this.wallService.userProfileChanged.subscribe(
      (userProfile: UserProfile) => {
        this.userProfile = userProfile;
      }
    );

=======
>>>>>>> prod
    this.route.params.subscribe((params) => {
      if (params.username === this.me.username) {
        this.isMe = true;
      }

<<<<<<< HEAD
      this.isLoading = true;
      this.wallService
        .getUserProfile(params.username)
        .pipe(
          tap(() => {
            this.isLoading = false;
          })
        )
        .subscribe(noop, () => {
          this.router.navigate(['/not-found']);
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
=======
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
>>>>>>> prod
  }
}
