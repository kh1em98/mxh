import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isOpenHamburgerMenu: boolean = false;
  user: User = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.user.
      pipe(
        take(1),
      )
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      )
  }

  onLogout() {
    this.authService.logout();
  }

  toggleHamburgerMenu() {
    this.isOpenHamburgerMenu = !this.isOpenHamburgerMenu;
  }

}
