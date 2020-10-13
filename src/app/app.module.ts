import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewsFeedComponent } from './news-feed/news-feed.component';
import { CookieService } from 'ngx-cookie-service';

import { RightComponent } from './news-feed/right/right.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './core/auth.module';
import { ProtectCSRFInterceptor } from './core/protectCSRF-interceptor.service';
import { PostModule } from './post/post.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewsFeedComponent,
    RightComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    PostModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProtectCSRFInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
