import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ContentService } from '../content.service';
import { Content, ContentInterface, ContentType } from '../content.model';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.sass'],
})
export class ContentListComponent implements OnInit {
  @Input() contentIds: string[];
  contentList$?: Observable<Content[]>;
  userIsLoggedIn: boolean;
  private contentService: ContentService;
  constructor(contentRepo: ContentService, private authService: AuthService) {
    this.contentService = contentRepo;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.userIsLoggedIn = true;
      }
    });
    //doesn't work, changes all to one when going from 1 contentdetail to contentlist
    if (!this.contentIds) {
      this.contentList$ = this.contentService.getAll().pipe(tap(console.log));
      this.contentList$.pipe(tap(console.log));
    } else {
      this.contentList$ = this.contentService.getAll().pipe(
        map((content) => {
          console.log('contentlist raw 1 value', content);

          let filteredContent = content.filter((item) => {
            console.log(
              'in filter, item.user and user.id',
              item.user,
              this.contentIds.includes(item.id)
            );
            console.log('truthiness: ', this.contentIds.includes(item.id));
            return this.contentIds.includes(item.id);
          });
          console.log('filteredContent: ', filteredContent);
          return filteredContent;
        }),
        tap((value) => console.log('contentlist raw 2 value:', value))
      );
    }
  }
}
