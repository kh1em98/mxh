import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Social App';

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
  ) { };

  ngOnInit() {
    this.authService.autoLogin();

    this.authService.user
      .subscribe((user) => {
        if (user === null) {
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        }
        else {
          this.isLoggedIn = true;
        }
      })
  }
}
