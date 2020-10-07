import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ForwardAuthGuard } from './guard/forwardAuth.guard';

const authRoutes: Routes = [{
    path: 'login', component: LoginComponent,
    canActivate: [ForwardAuthGuard]
},
{
    path: 'signup', component: SignupComponent,
    canActivate: [ForwardAuthGuard]
}]

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}

