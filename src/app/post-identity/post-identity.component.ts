import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { MyCookieService } from '../core/my-cookie.service';

@Component({
  selector: 'app-post-identity',
  templateUrl: './post-identity.component.html',
  styleUrls: ['./post-identity.component.css'],
})
export class PostIdentityComponent implements OnInit {
  constructor(private http: HttpClient) {}

  identity1: string = null;
  identity2: string = null;

  alertLabel: {
    typeAlert: string;
    message: string;
  } = null;
  isLoading: boolean = false;

  ngOnInit(): void {}

  uploadImg(event) {
    const formData = new FormData();
    formData.append('identityCard', event.target.files[0]);

    this.isLoading = true;
    this.http
      .post(`http://localhost:5502/api/v1/user/uploadAnh`, formData)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(
        (response: any) => {
          console.log(response.data);
          if (!this.identity1) {
            this.identity1 = response.data.imageUrl;
          } else if (!this.identity2) {
            this.identity2 = response.data.imageUrl;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
