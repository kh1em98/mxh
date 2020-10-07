import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { NewsFeedComponent } from './news-feed/news-feed.component';
import { CookieService } from 'ngx-cookie-service';
import { WallComponent } from './user/wall/wall.component';

import { PostComponent } from './post/post.component';
import { RightComponent } from './news-feed/right/right.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CommentComponent } from './comment/comment.component';
import { UserModule } from './user/user.module';
import { AlertModule } from './shared/alert.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    NewsFeedComponent,
    WallComponent,
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
    UserModule,
    AlertModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
