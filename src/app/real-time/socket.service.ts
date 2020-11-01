import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

export interface UserOnline {
  name: string;
  username: string;
  avatar: string;
  _id: string;
  isOnline: boolean;
  lastActive: Date;
  socketId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any = null;

  listUserOnline = new Subject<UserOnline[]>();

  constructor() {}

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('changedListUser', (listUser: UserOnline[]) => {
      this.listUserOnline.next(listUser);
    });
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
