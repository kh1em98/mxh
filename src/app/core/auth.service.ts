import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signUp(formValue) {
    const { username, email, password } = formValue;

    this.http.post('/api/register', { username, email, password })
      .subscribe((data) => {
        console.log(data);
      },
        (err) => console.log(err))
  }
}
