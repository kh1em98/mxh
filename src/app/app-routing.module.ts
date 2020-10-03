import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './profile/user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { ForwardAuthGuard } from './core/guard/forwardAuth.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { OnlyMeGuard } from './core/guard/only-me.guard';

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
        path: ':username', component: ProfileComponent,
        children: [
            {
                path: 'edit', component: EditComponent, canActivate: [OnlyMeGuard]
            },
            {
                path: 'profile', component: UserComponent
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