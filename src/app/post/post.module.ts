import { NgModule } from '@angular/core';
import { PostComponent } from './post.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { CommentComponent } from '../comment/comment.component';
import { CreateCommentComponent } from '../comment/create-comment/create-comment.component';
import { PostDropdownComponent } from './post-dropdown/post-dropdown.component';
import { BoxComponent } from './box/box.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostComponent,
    CreatePostComponent,
    CommentComponent,
    CreateCommentComponent,
    PostDropdownComponent,
    BoxComponent,
  ],
  imports: [ReactiveFormsModule, FormsModule, SharedModule],
  exports: [
    PostComponent,
    CreatePostComponent,
    CommentComponent,
    CreateCommentComponent,
    PostDropdownComponent,
    BoxComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PostModule {}
