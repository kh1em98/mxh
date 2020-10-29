import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { NotificationService } from './real-time/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Social App';

  isLoggedIn: boolean = false;

  notification: {
    message: string;
    typeNotification: string;
  } = null /* {
    message:
      '<a class="dropdown-item fontweight-1 gray-7 pt-2 pb-2"> <i class="far fa-thumbs-up mr-2"></i> Thien Nguyen đã thích bài viết của bạn</a>',
    typeNotification: 'alert-primary',
  } */;

  constructor(
    private authService: AuthService,
    private notiService: NotificationService
  ) {}

  async ngOnInit() {
    console.log('123');

    const cac = new Promise((resolve) => {
      setTimeout(() => {
        resolve(4);
      }, 5000);
    });

    const value = await cac;
    console.log('dau buoi');
    console.log(value);

    /* const a = new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
        console.log('A');
      }, 3000);
    });

    const b = new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
        console.log('B');
      }, 5000);
    });

    const c = new Promise((resolve) => {
      setTimeout(() => {
        resolve(3);
        console.log('C');
      }, 4000);
    });

    let results = await Promise.all([a, b, c]);

    console.log(
      results.reduce((total: number, value: number) => total * value)
    ); */

    /* this.authService.autoLogin();

    this.authService.user.subscribe((user) => {
      if (user === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    }); */
  }

  showNotification(notification: any) {
    this.notification = {
      message: notification.message,
      typeNotification: notification.type,
    };

    setTimeout(() => {
      this.notification = null;
    }, 1500);
  }
}
