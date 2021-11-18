import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentListComponent } from './pages/content/content-list/content-list.component';
import { ContentDetailComponent } from './pages/content/content-detail/content-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { ContentEditComponent } from './pages/content/content-edit/content-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AppComponent,
    ContentListComponent,
    ContentDetailComponent,
    AboutComponent,
    ContentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    RouterTestingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
