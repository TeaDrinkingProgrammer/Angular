import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ContentListComponent } from './pages/content/content-list/content-list.component';
import { ContentDetailComponent } from './pages/content/content-detail/content-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { ContentEditComponent } from './pages/content/content-edit/content-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ContentListListComponent } from './pages/contentList/contentList-list/contentList-list.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { PrivateContentListListComponent } from './pages/contentList/private-contentList-list/private-contentList-list.component';
import { ContentListEditComponent } from './pages/contentList/contentList-edit/contentList-edit.component';
import { ContentListDetailComponent } from './pages/contentList/contentList-detail/contentList-detail.component';
import { AddToListComponent } from './pages/contentList/add-to-list/add-to-list.component';
import { CommentListComponent } from './pages/comments/comment-list/comment-list.component';
@NgModule({
  declarations: [
    AppComponent,
    ContentListComponent,
    ContentDetailComponent,
    ContentEditComponent,
    ContentListListComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    PrivateContentListListComponent,
    ContentListEditComponent,
    ContentListDetailComponent,
    AddToListComponent,
    CommentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
