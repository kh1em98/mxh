import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      )
  }

}
