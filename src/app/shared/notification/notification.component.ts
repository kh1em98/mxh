import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    // Animation fade notification
    trigger('fade', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),

      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(350),
      ]),

      transition('* => void', [
        animate(
          350,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  @Input() typeNotification: string;
  @Input() message: string;
  constructor() {}

  ngOnInit(): void {}
}
