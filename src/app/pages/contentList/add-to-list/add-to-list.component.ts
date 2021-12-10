import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { ContentList } from '../contentList.model';
import { ContentListService } from '../contentList.service';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.sass'],
})
export class AddToListComponent implements OnInit {
  contentLists$: Observable<ContentList[]>;
  constructor(
    private contentListService: ContentListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentLists$ = this.contentListService
      .getAll()
      .pipe(tap(console.log));
    console.log('list:');
    this.contentLists$.pipe(tap(console.log));
  }
  addToList(contentListId: string) {
    this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          let id = params.get('id');
          if (id !== null) {
            let newId = id as string;
            this.contentListService
              .getForId(contentListId)
              .subscribe((item) => {
                if (item.content === undefined) {
                  item.content = [];
                }
                console.log('contentids: ', item.content);
                item.content.push(newId);
                console.log(
                  'addtolist item sent to contentlistservice: ',
                  item
                );
                this.contentListService
                  .update(contentListId, item)
                  .subscribe(() => {
                    this.router.navigate(['/list/', contentListId]);
                  });
              });
          } else {
            console.log('param is wrong:', id);
          }
          return '';
        }),
        tap(console.log)
      )
      .subscribe(() => {});
  }
}
