import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  alertClose: Subscription = null;
  errorMessage: string = '';
  loginForm: FormGroup = null;
  alertLabel: {
    message: string;
    typeAlert: string;
  } = null;
  code: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.code = params.code;
      console.log('Code : ', this.code);
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
      .put('http://localhost:5502/api/v1/auth/resetPassword', {
        ...this.loginForm.value,
        code: this.code,
      })
      .subscribe(
        () => {
          this.isLoading = false;
          this.alertLabel = {
            message: 'Reset password thành công',
            typeAlert: 'alert-success',
          };
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Lỗi không xác định';
        }
      );
  }

  onCloseAlert() {
    this.errorMessage = '';
  }
}
