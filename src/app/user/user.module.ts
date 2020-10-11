import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { WallComponent } from './wall/wall.component';
import { SharedModule } from '../shared/shared.module';
import { PostModule } from '../post/post.module';

@NgModule({
  declarations: [ProfileComponent, EditComponent, UserComponent, WallComponent],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PostModule,
  ],
})
export class UserModule {}
