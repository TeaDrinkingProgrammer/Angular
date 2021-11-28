import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContentEditComponent } from './pages/content/content-edit/content-edit.component';
import { ContentDetailComponent } from './pages/content/content-detail/content-detail.component';
import { ContentListComponent } from './pages/content/content-list/content-list.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  { path:'content',pathMatch:'full',component: ContentListComponent},//kan met children kindroutes maken
  { path:'content/:id',pathMatch:'full',component: ContentDetailComponent}, 
  { path:'content/:id/edit',pathMatch:'full',component: ContentEditComponent}, 
  { path:'new-content',pathMatch:'full',component: ContentEditComponent},
  { path: 'user',pathMatch:'full',component: UserListComponent}, 
  { path: 'user/:id',pathMatch:'full',component: UserDetailComponent}, 
  { path: 'user/:id/edit',pathMatch:'full',component: UserEditComponent}, 
  { path:'about',pathMatch:'full',component: AboutComponent },
  { path:'new-user',pathMatch:'full',component: UserEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes}
