import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { AlertLabelComponent } from './alert-label/alert-label.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotificationComponent } from './notification/notification.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    AlertLabelComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    NotificationComponent,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    AlertLabelComponent,
    PlaceholderDirective,
    CommonModule,
    LoadingSpinnerComponent,
    NotificationComponent,
  ],
})
export class SharedModule {}
