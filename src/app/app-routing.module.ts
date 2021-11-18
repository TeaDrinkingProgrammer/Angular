import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContentEditComponent } from './pages/content/content-edit/content-edit.component';
import { ContentDetailComponent } from './pages/content/content-detail/content-detail.component';
import { ContentListComponent } from './pages/content/content-list/content-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  { path:'content',pathMatch:'full',component: ContentListComponent},//kan met children kindroutes maken
  { path:'content/:id',pathMatch:'full',component: ContentDetailComponent}, 
  { path:'content/:id/edit',pathMatch:'full',component: ContentEditComponent}, 
  { path:'new-content',pathMatch:'full',component: ContentEditComponent}, 
  { path:'about',pathMatch:'full',component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
