import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { OnlyMeGuard } from '../core/guard/only-me.guard';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';
import { WallComponent } from './wall/wall.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: WallComponent,
      },
      {
        path: 'edit',
        component: EditComponent,
        canActivate: [OnlyMeGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [OnlyMeGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
