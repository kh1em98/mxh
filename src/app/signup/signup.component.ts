import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  signUpForm: FormGroup = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.min(3),
      ]),
      password: new FormControl('', [Validators.required, Validators.min(3)]),
    });
  }

  onSubmit() {
    this.isLoading = true;

    this.http
      .post('http://localhost:5502/api/v1/auth/signUp', this.signUpForm.value)
      .subscribe(
        () => {
          this.isLoading = false;
          this.authService.alertLabel = {
            message: 'Đăng ký thành công. Hãy đăng nhập',
            typeAlert: 'alert-success',
          };
          this.router.navigate(['/login']);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error;
        }
      );

    /*     this.authService.signUp(this.signUpForm.value).subscribe(
      () => {
        this.isLoading = false;
        this.authService.alertLabel = {
          message: 'Đăng ký thành công. Hãy đăng nhập',
          typeAlert: 'alert-success',
        };
        this.router.navigate(['/login']);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    ); */
  }

  onCloseAlert() {
    this.errorMessage = '';
  }
}
