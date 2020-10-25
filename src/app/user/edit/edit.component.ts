import { MyCookieService } from './../../core/my-cookie.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/shared/user.model';
import { take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  editForm: FormGroup = null;
  isLoading: boolean = false;

  subscription: Subscription = null;

  user: User = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private myCookieService: MyCookieService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user: User) => {
      this.user = user;
    });

    this.editForm = new FormGroup({
      name: new FormControl(''),
      bio: new FormControl(''),
      phone: new FormControl(''),
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.http
      .post(`/api/user${this.router.url}`, {
        ...this.editForm.value,
      })
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        () => {
          this.authService.user.next(this.myCookieService.decodePayload());
        },
        (error) => {
          console.log(error);
        }
      );
  }

  uploadImg(event) {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    this.isLoading = true;
    this.http
      .post(`/api/user${this.router.url}/uploadAvatar`, formData)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(
        () => {
          this.authService.user.next(this.myCookieService.decodePayload());
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
