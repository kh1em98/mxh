import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
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

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;


  constructor(private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) { }

  ngOnInit(): void {
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
  }

  onSubmit() {
    this.authService.login(this.loginForm.value)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error;
          this.showAlertError(error);
        }
      )
  }

  private showAlertError(error: string) {
    const alertCmpFactory = this.componentFactoryResolver.
      resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const alertCmpRef = hostViewContainerRef.createComponent(alertCmpFactory);

    alertCmpRef.instance.message = error;

    this.alertClose = alertCmpRef.instance.close
      .subscribe(() => {
        this.alertClose.unsubscribe();
        hostViewContainerRef.clear();
      })
  }

}
