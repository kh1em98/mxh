import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { AlertLabelComponent } from './alert-label/alert-label.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from '../comment/comment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AlertComponent,
        AlertLabelComponent,
        PlaceholderDirective,
        PostComponent,
        CommentComponent
    ],
    imports: [CommonModule, FormsModule],
    exports: [
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