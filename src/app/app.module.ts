import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentListComponent } from './pages/content/content-list/content-list.component';
import { ContentDetailComponent } from './pages/content/content-detail/content-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AppComponent,
    ContentListComponent,
    ContentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
