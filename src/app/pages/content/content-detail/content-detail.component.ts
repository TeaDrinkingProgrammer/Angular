import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap  } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { ContentRepoService } from '../content-repo.service';
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
  private contentService : ContentRepoService;
  constructor(contentRepo : ContentRepoService, route : ActivatedRoute) {
    this.contentService = contentRepo;
    this.route = route;
   }
  ngOnInit(): void {
    // this.route.paramMap.subscribe(param => {
    //   this.id = <number> <unknown>param.get('id');
    // })
    // if(this.id != null){
    //   this.content = this._contentRepo.getForId(this.id);
    //   console.log(this.content?.targetLanguage)
    //   console.log(this.content?.inProduction)
    // } else {
    //   //TODO improve this
    //   alert("error, id is not read");
    // }
    this.subscription = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log('id:',params.get('id'))),
      switchMap((params : ParamMap) => 
      this.contentService.getForId(parseInt(params.get('id') ?? '-1',10))
      ),
      tap(console.log)
      ).subscribe((content) => {
       this.content$ = content;
      }) 
  }
}
