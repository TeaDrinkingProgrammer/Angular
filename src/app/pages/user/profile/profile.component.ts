import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  contentLists$: Observable<User[]>;
  loggedInUser?: User;
  constructor(
    private UserService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      console.log('user content: ', user);
      console.log('user truthiness: ', user ? true : false);
      console.log(
        'user truthiness undefined: ',
        user != undefined ? true : false
      );
      //Ik wil hier gewoon if kunnen doen
      //Object.keys(user as any).length !== 0
      if (user != undefined) {
        this.loggedInUser = user;
      } else {
        this.loggedInUser = undefined;
      }
    });
    //doesn't work, changes all to one when going from 1 contentdetail to contentlist
    this.contentLists$ = this.UserService.getAll().pipe(tap(console.log));
    console.log('list:');
    this.contentLists$.pipe(tap(console.log));
  }
  // deleteContent(id: string) {
  //   console.log('button click', id);
  //   //Response returns deleted items
  //   this.contentListService.deleteForId(id).pipe().subscribe();
  //   // //TODO is this correct?
  //   this.contentList$ = this.contentListService.getAll().pipe(tap(console.log));
  // }
}
