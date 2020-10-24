import { WallService } from './wall.service';
import { WallComponent } from './wall/wall.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [WallService],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {
    console.log('CON cac');
  }

  ngOnDestroy() {
    console.log('USer component destroy');
  }
}
