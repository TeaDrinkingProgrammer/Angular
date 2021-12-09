import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ContentListService } from '../contentList.service';
import { ContentList } from '../contentList.model';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-private-contentList-list',
  templateUrl: './private-contentList-list.component.html',
  styleUrls: ['./private-contentList-list.component.sass'],
})
export class PrivateContentListListComponent implements OnInit {
  contentLists$: Observable<ContentList[]>;
  constructor(
    private contentListService: ContentListService,
    private authController: AuthService
  ) {}

  ngOnInit(): void {
    //doesn't work, changes all to one when going from 1 contentdetail to contentlist

    let userId: string = '';
    this.authController.currentUser$.subscribe((user) => {
      if (user) {
        userId = user.id;
      }
    });
    this.contentLists$ = this.contentListService
      .getForUserId(userId)
      .pipe(tap(console.log));
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
