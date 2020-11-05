import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  alertClose: Subscription = null;
  errorMessage: string = '';
  loginForm: FormGroup = null;
  alertLabel: {
    message: string;
    typeAlert: string;
  } = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('kh1em9800@gmail.com', [
        Validators.email,
        Validators.required,
      ]),
    });
  }

  ngOnDestroy() {
    if (this.alertClose) {
      this.alertClose.unsubscribe();
    }
    this.alertLabel = null;
    this.authService.alertLabel = null;
  }

  onSubmit() {
    this.isLoading = true;

    this.http
      .post(
        'http://localhost:5502/api/v1/auth/forgetPassword',
        this.loginForm.value
      )
      .subscribe(
        () => {
          this.isLoading = false;
          this.alertLabel = {
            message: 'Đã gửi email. Hãy kiểm tra hòm thư của bạn',
            typeAlert: 'alert-success',
          };
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error;
        }
      );
  }

  onCloseAlert() {
    this.errorMessage = '';
  }
}
