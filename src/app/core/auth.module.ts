import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
