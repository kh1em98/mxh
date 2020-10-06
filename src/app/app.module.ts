import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { CookieService } from 'ngx-cookie-service';
import { WallComponent } from './user/wall/wall.component';
import { AlertLabelComponent } from './shared/alert-label/alert-label.component';
import { PostComponent } from './post/post.component';
import { RightComponent } from './news-feed/right/right.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CommentComponent } from './comment/comment.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    AlertComponent,
    PlaceholderDirective,
    NewsFeedComponent,
    WallComponent,
    AlertLabelComponent,
    PostComponent,
    RightComponent,
    CreatePostComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
