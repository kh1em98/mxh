import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
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
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }