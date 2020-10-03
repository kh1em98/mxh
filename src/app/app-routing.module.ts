import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './profile/user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { ForwardAuthGuard } from './core/guard/forwardAuth.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { NewsFeedComponent } from './news-feed/news-feed.component';

const routes: Routes = [
    {
        path: '', pathMatch: 'full', canActivate: [AuthGuard],
        component: NewsFeedComponent,
    },
    {
        path: 'login', component: LoginComponent,
        canActivate: [ForwardAuthGuard]
    },
    {
        path: 'signup', component: SignupComponent,
        canActivate: [ForwardAuthGuard]
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
        ],
        canActivate: [AuthGuard]
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