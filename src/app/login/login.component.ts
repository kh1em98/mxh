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
  alertLabel = null;

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
        console.log('Login thanh cong');
        this.isLoading = false;
        this.router.navigate(['/']);
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
