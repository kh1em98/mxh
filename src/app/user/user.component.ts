<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { WallService } from './wall.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
>>>>>>> prod

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
<<<<<<< HEAD
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

=======
  styleUrls: ['./user.component.css'],
  providers: [WallService],
})
export class UserComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

  }
>>>>>>> prod
}
