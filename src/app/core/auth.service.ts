import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { MyCookieService } from './my-cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  alertLabel: {
    message: string;
    typeAlert: string;
  } = null;
  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private myCookieService: MyCookieService,
    private router: Router
  ) {}

  signUp(formValue) {
    const { username, email, password, name } = formValue;
    return this.http
      .post('/api/register', {
        name,
        username,
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  login(formValue) {
    const { email, password } = formValue;
    return this.http
      .post('/api/login', {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap(() => {
          const user: User = this.myCookieService.decodePayload();
          this.user.next(user);
        })
      );
  }

  logout() {
    this.router.navigate(['/login']);
    this.myCookieService.delete('headerAndPayload');
    this.user.next(null);
  }

  autoLogin() {
    const user: User = this.myCookieService.decodePayload();
    this.user.next(user);
  }

  handleError(errorRes: HttpErrorResponse) {
    const errorMessage = errorRes.error.message;
    return throwError(errorMessage);
  }
}
