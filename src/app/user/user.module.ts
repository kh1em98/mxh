import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { OnlyMeGuard } from '../core/guard/only-me.guard';
import { WallComponent } from './wall/wall.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const userRoutes: Routes = [{
    path: ':username', component: UserComponent, canActivate: [AuthGuard],
    children: [
        {
            path: '', component: WallComponent
        },
        {
            path: 'edit', component: EditComponent, canActivate: [OnlyMeGuard]
        },
        {
            path: 'profile', component: ProfileComponent
        }
    ],
},]


@NgModule({
    declarations: [
        ProfileComponent,
        EditComponent,
        UserComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(userRoutes), ReactiveFormsModule, FormsModule]
})
export class UserModule {

}