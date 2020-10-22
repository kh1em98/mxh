import { tap, take } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from '../../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile, WallService } from '../wall.service';
import { noop, Subscription, Observable } from 'rxjs';
import { Post } from 'src/app/post/post.model';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
})
export class WallComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private wallService: WallService,
    private router: Router
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

    this.subscription = this.wallService.userProfileChanged.subscribe(
      (userProfile: UserProfile) => {
        this.userProfile = userProfile;
      }
    );

    this.wallPosts = this.wallService.wallPosts;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
