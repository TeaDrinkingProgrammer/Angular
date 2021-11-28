import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { User } from '../User.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  id?: number | null;
  subscription? : Subscription
  user$? : User;

  constructor(private userService : UserService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log('id from paramMap:',params.get('id'))),
      switchMap((params : ParamMap) => 
      this.userService.getForId(parseInt(params.get('id') ?? '-1',10))
      ),
      tap(console.log)
      ).subscribe((content) => {
       this.user$ = content;
      }); 
  }

}
