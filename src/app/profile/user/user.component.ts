import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { AuthService } from '../../core/auth.service';
import { take } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = null;

  constructor(private authService: AuthService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.authService.user
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      )
  }

}
