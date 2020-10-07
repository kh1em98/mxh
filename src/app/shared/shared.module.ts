import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { AlertLabelComponent } from './alert-label/alert-label.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from '../comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from '../create-post/create-post.component';

@NgModule({
    declarations: [
        CreatePostComponent,
        AlertComponent,
        AlertLabelComponent,
        PlaceholderDirective,
        PostComponent,
        CommentComponent
    ],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [
        CreatePostComponent,
        PostComponent,
        CommentComponent,
        AlertComponent,
        AlertLabelComponent,
        PlaceholderDirective,
        CommonModule
    ]
})
export class SharedModule {

}