import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap  } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { ContentService } from '../content.service';
import { Content, ContentInterface, ContentType } from '../content.model';
@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.sass']
})
export class ContentDetailComponent implements OnInit {
  id?: number | null;
  route : ActivatedRoute;
  subscription? : Subscription
  content$? : Content;
  private contentService : ContentService;
  constructor(contentService : ContentService, route : ActivatedRoute) {
    this.contentService = contentService;
    this.route = route;
   }
  ngOnInit(): void {
    console.log("ngOnInit content-detail")
    this.subscription = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log('id from paramMap:',params.get('id'))),
      switchMap((params : ParamMap) => 
      this.contentService.getForId(parseInt(params.get('id') ?? '-1',10))
      ),
      tap(console.log)
      ).subscribe((content) => {
       this.content$ = content;
      }); 
  }
}
