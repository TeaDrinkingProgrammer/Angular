import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { ContentService } from '../content.service';
import { Content, ContentInterface, ContentType } from '../content.model';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.sass'],
})
export class ContentDetailComponent implements OnInit {
  id?: number | null;
  route: ActivatedRoute;
  subscription?: Subscription;
  content: Content;
  private contentService: ContentService;
  isOwner: boolean;
  constructor(
    contentService: ContentService,
    route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.contentService = contentService;
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
          this.contentService.getForId(params.get('id') ?? '-1')
        ),
        tap(console.log)
      )
      .subscribe((content) => {
        this.content = content;
        this.authService.currentUser$.subscribe((user) => {
          console.log('content detail user:', user?.id, ':', content.user);
          if (user) {
            if (content.user == user.id) {
              this.isOwner = true;
            } else {
              this.isOwner = false;
            }
          }
        });
      });
  }
  deleteContent() {
    //Response returns deleted items
    this.contentService.deleteForId(this.content.id).pipe().subscribe();
    this.router.navigate(['/']);
    this.alertService.success('Item successfully deleted');
  }
}
