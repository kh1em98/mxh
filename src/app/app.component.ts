import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { SocketService } from './real-time/socket.service';

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
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();

    this.authService.user.subscribe((user) => {
      if (user === null) {
        console.log('Disconnect socket');
        this.isLoggedIn = false;
        this.socketService.disconnectSocket();
      } else {
        this.isLoggedIn = true;
        this.socketService.setupSocketConnection();
      }
    });
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
