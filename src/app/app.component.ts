import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './pages/auth/auth.service';
import { User } from './pages/user/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  public isCollapsed = true;
  public pointer = false;
  // public loggedInUser$: Observable<User>;
  public loggedInUser?: User;
  title = 'angular-app';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    //TODO vragenuur: Fix this, ik wil een nullable user hebben
    this.authService.currentUser$.subscribe((user) => {
      console.log('user content: ', user);
      console.log('user truthiness: ', user ? true : false);
      //Ik wil hier gewoon if kunnen doen
      if (Object.keys(user as any).length !== 0) {
        this.loggedInUser = user;
      } else {
        this.loggedInUser = undefined;
      }
    });
  }
  logout() {
    this.authService.logout();
  }
}
