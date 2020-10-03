import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: User = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user
      .pipe(
        take(1)
      )
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      )
  }

}
