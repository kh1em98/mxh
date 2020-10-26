import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/shared/user.model';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User = null;
  subscription: Subscription = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
