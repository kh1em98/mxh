import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/shared/user.model';

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
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      )
  }

}
