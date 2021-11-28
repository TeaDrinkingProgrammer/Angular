import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ContentService } from '../content.service';
import { Content, ContentInterface, ContentType } from '../content.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.sass']
})

export class ContentListComponent implements OnInit {
  contentList?: Observable<Content[]>;
  private contentService : ContentService;
  constructor(contentRepo : ContentService) {
    this.contentService = contentRepo;
   }

  ngOnInit(): void {
    //doesn't work, changes all to one when going from 1 contentdetail to contentlist
    this.contentList = this.contentService.getAll().pipe(
      tap(console.log)
    );
    console.log(this.contentList)
  }

}
