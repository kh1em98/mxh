import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './profile/user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';

const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'signup'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'profile', component: ProfileComponent,
        children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'user'
            },
            {
                path: 'edit', component: EditComponent
            },
            {
                path: 'user', component: UserComponent
            }
        ]
    },

]


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}