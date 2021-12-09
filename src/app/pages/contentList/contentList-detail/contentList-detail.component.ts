import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { ContentListService } from '../contentList.service';
import { ContentList } from '../contentList.model';
import { ContentListComponent } from '../../content/content-list/content-list.component';
import { AuthService } from '../../auth/auth.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-contentList-detail',
  templateUrl: './contentList-detail.component.html',
  styleUrls: ['./contentList-detail.component.sass'],
})
export class ContentListDetailComponent implements OnInit {
  id?: string | null;
  userId: string;
  route: ActivatedRoute;
  subscription?: Subscription;
  contentList: ContentList;
  constructor(
    private contentListService: ContentListService,
    route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.route = route;
  }
  ngOnInit(): void {
    console.log('ngOnInit content-detail');
    this.subscription = this.route.paramMap
      .pipe(
        tap((params: ParamMap) =>
          console.log('id from paramMap:', params.get('id'))
        ),
        switchMap((params: ParamMap) =>
          this.contentListService.getForId(params.get('id') ?? '-1')
        ),
        tap(console.log)
      )
      .subscribe((content) => {
        this.contentList = content;
      });
  }
}
