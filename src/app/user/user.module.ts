import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';




@NgModule({
    declarations: [
        ProfileComponent,
        EditComponent,
        UserComponent,
    ],
    imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, FormsModule]
})
export class UserModule {

}