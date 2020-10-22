import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { AlertLabelComponent } from './alert-label/alert-label.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        AlertLabelComponent,
        PlaceholderDirective
    ],
    imports: [CommonModule],
    exports: [
        AlertComponent,
        AlertLabelComponent,
        PlaceholderDirective,
        CommonModule
    ]
})
export class AlertModule {

}