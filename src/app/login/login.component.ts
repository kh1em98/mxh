import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  alertClose: Subscription = null;
  errorMessage: string = '';
  loginForm: FormGroup = null;
  alertLabel = null;

  constructor(private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.alertLabel = this.authService.alertLabel;
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(3)
      ])
    })
  }

  ngOnDestroy() {
    if (this.alertClose) {
      this.alertClose.unsubscribe();
    }
    this.alertLabel = null;
    this.authService.alertLabel = null;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error;
        }
      )
  }

  onCloseAlert() {
    this.errorMessage = '';
  }
}
