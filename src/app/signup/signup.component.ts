import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string = '';
  signUpForm: FormGroup = null;

  constructor(private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.min(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(3)
      ])
    })
  }

  onSubmit() {
    this.authService.signUp(this.signUpForm.value)
      .subscribe(
        () => this.router.navigate(['/login']),
        (error) => {
          this.errorMessage = error;
        }
      )
  }

  onCloseAlert() {
    console.log('Close alert component');
    this.errorMessage = '';
  }
}
