import { WallService } from './wall.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [WallService],
})
export class UserComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
