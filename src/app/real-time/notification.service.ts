import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private url = 'http://localhost:8080';
  private socket: any;

  constructor() {
    this.socket = io(this.url);
  }
}
