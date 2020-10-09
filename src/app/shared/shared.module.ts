import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { AlertLabelComponent } from './alert-label/alert-label.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from '../comment/comment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreatePostComponent } from '../create-post/create-post.component';
import { CreateCommentComponent } from '../comment/create-comment/create-comment.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    PostComponent,
    CreatePostComponent,
    AlertComponent,
    AlertLabelComponent,
    PlaceholderDirective,
    CommentComponent,
    CreateCommentComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CreatePostComponent,
    PostComponent,
    CommentComponent,
    CreateCommentComponent,
    AlertComponent,
    AlertLabelComponent,
    PlaceholderDirective,
    CommonModule,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
