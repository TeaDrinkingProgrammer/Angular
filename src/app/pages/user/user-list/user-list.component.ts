import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../User.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  public users$?: Observable<User[]>;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAll().pipe(
      tap(console.log)
    );
  }
  deleteContent(id: number){
    console.log("button click", id)
    this.userService.deleteForId(id);
    //TODO is this correct?
    this.users$ = this.userService.getAll().pipe(
      tap(console.log)
    );
  }

}
