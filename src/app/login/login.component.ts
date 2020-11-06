import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  alertClose: Subscription = null;
  errorMessage: string = '';
  loginForm: FormGroup = null;
  alertLabel: {
    message: string;
    typeAlert: string;
  } = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.alertLabel = this.authService.alertLabel;
    this.loginForm = new FormGroup({
      email: new FormControl('k1@gm.co', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('123', [
        Validators.required,
        Validators.min(3),
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
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.isLoading = false;
        this.alertLabel = {
          message: 'Đăng nhập thành công',
          typeAlert: 'alert-success',
        };
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Đăng nhập không thành công. Hãy thử lại';
      }
    );
  }

  onCloseAlert() {
    this.errorMessage = '';
  }
}
