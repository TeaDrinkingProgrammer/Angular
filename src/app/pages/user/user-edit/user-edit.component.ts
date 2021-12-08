import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass'],
})
export class UserEditComponent implements OnInit {
  private subscription?: Subscription;
  public user: User;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = {
      id: '-1',
      firstName: 'first name',
      lastName: 'last name',
      email: 'Email',
      token: 'laksjdjflsihf',
    };
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          if (!params.get('id') ?? 'null') {
            return of({
              id: -1,
              name: {
                firstName: 'first name',
                lastName: 'last name',
              },
              email: 'Email',
            });
          } else {
            return this.userService.getForId(params.get('id') ?? '-1');
          }
        }),
        tap(console.log)
      )
      .subscribe((user) => {
        this.user = user;
      });
  }
  onSubmit(): void {
    if (this.user.id === '-1') {
      console.log('create user');
      this.userService.pushItem(this.user);
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      console.log('update user');
      this.userService.setOption(this.user.id, this.user);
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
}
