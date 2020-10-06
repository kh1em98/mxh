import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        ProfileComponent,
        EditComponent,
        UserComponent,
    ],
    imports: [CommonModule, RouterModule]
    ,
    exports: [
        ProfileComponent,
        EditComponent,
        UserComponent,
    ]
})
export class UserModule {

}