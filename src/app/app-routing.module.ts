import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContentEditComponent } from './pages/content/content-edit/content-edit.component';
import { ContentDetailComponent } from './pages/content/content-detail/content-detail.component';
import { ContentListComponent } from './pages/content/content-list/content-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ContentListListComponent } from './pages/contentList/contentList-list/contentList-list.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ContentListEditComponent } from './pages/contentList/contentList-edit/contentList-edit.component';
import { ContentListDetailComponent } from './pages/contentList/contentList-detail/contentList-detail.component';
import { AddToListComponent } from './pages/contentList/add-to-list/add-to-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  { path: 'content', pathMatch: 'full', component: ContentListComponent }, //kan met children kindroutes maken
  { path: 'content/:id', pathMatch: 'full', component: ContentDetailComponent },
  {
    path: 'content/:id/edit',
    pathMatch: 'full',
    component: ContentEditComponent,
  },
  { path: 'new-content', pathMatch: 'full', component: ContentEditComponent },
  // { path: 'user', pathMatch: 'full', component: UserListComponent },
  { path: 'lists', pathMatch: 'full', component: ContentListListComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'profile', pathMatch: 'full', component: ProfileComponent },
  {
    path: 'list/:id/edit',
    pathMatch: 'full',
    component: ContentListEditComponent,
  },
  {
    path: 'list/:id',
    pathMatch: 'full',
    component: ContentListDetailComponent,
  },
  { path: 'add-to-list/:id', pathMatch: 'full', component: AddToListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export { routes };
