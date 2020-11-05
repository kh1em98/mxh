import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CanDeactivateGuard } from './core/can-deactive-guard.service';
import { ForgetComponent } from './forget/forget.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    component: NewsFeedComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetComponent,
  },
  {
    path: 'resetPassword',
    component: ResetComponent,
  },
  {
    path: ':username',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
