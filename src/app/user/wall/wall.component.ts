import { tap, take } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from '../../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile, WallService } from '../wall.service';
import { noop, Subscription } from 'rxjs';

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

  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user: User) => {
      this.me = user;
    });

    this.subscription = this.wallService.userProfileChanged.subscribe(
      (userProfile: UserProfile) => {
        this.userProfile = userProfile;
      }
    );

    this.route.params.subscribe((params) => {
      if (params.username === this.me.username) {
        this.isMe = true;
      }

      if (this.userProfile && params.username === this.userProfile.username) {
        console.log('Khong can load lai user : ', this.userProfile);
      } else {
        this.isLoading = true;
        this.wallService
          .getUserProfile(params.username)
          .pipe(
            tap(() => {
              this.isLoading = false;
            })
          )
          .subscribe(
            () => {
              console.log('Profile load : ', this.userProfile);
            },
            () => {
              this.router.navigate(['/not-found']);
            }
          );
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
