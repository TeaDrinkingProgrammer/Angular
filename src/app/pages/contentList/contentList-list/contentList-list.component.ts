import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ContentListService } from '../contentList.service';
import { ContentList } from '../contentList.model';
@Component({
  selector: 'app-contentList-list',
  templateUrl: './contentList-list.component.html',
  styleUrls: ['./contentList-list.component.sass'],
})
export class ContentListListComponent implements OnInit {
  contentLists$: Observable<ContentList[]>;
  constructor(private contentListService: ContentListService) {}

  ngOnInit(): void {
    //doesn't work, changes all to one when going from 1 contentdetail to contentlist
    this.contentLists$ = this.contentListService
      .getAll()

      .pipe(
        map((contentLists) => {
          let returnLists;
          returnLists = contentLists.filter((list) => {
            console.log('list', list);
            return list.isPrivate == false;
          });
          return returnLists;
        }),
        tap(console.log)
      );
    console.log('list:');
  }
  // deleteContent(id: string) {
  //   console.log('button click', id);
  //   //Response returns deleted items
  //   this.contentListService.deleteForId(id).pipe().subscribe();
  //   // //TODO is this correct?
  //   this.contentList$ = this.contentListService.getAll().pipe(tap(console.log));
  // }
}
