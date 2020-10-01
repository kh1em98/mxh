import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
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
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.value);
  }
}
