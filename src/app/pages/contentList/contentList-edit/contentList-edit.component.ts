import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TagInputForm } from 'ngx-chips';
import {
  Observable,
  ObservableNotification,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ContentListService } from '../contentList.service';
import { ContentList } from '../contentList.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
interface Tag {
  value: string;
  display: string;
}
@Component({
  selector: 'app-content-edit',
  templateUrl: './contentList-edit.component.html',
  styleUrls: ['./contentList-edit.component.sass'],
})
export class ContentListEditComponent implements OnInit {
  private route: ActivatedRoute;
  private subscription?: Subscription;
  public list: ContentList;
  private router: Router;
  constructor(
    private contentListService: ContentListService,
    route: ActivatedRoute,
    router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void {
    console.log('contentinterfaces: ', this.contentListService);
    this.subscription = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          if (!params.get('id') ?? 'null') {
            return of({
              name: 'Name here',
              description: 'Description here',
              private: false,
            });
          } else {
            let userId: any;
            this.authService.currentUser$.subscribe(
              (user) => (userId = user?.id)
            );
            let returnItem = this.contentListService.getForId(
              params.get('id') ?? '-1'
            );
            returnItem.subscribe((item) => {
              console.log('item: ', item);
              if (item.user != userId) {
                this.router.navigate(['/']);
                this.alertService.error('Cannot edit content you do not own!');
              }
            });
            return returnItem;
          }
        }),
        tap(console.log)
      )
      .subscribe((content) => {
        this.list = content;
      });
  }
  onSubmit(): void {
    if (!this.list.id) {
      console.log('create content');
      console.log('item sent to service:', this.list);
      //!! TODO Temporary before auth gets implemented
      this.contentListService.add(this.list).subscribe(console.log);
      this.router.navigate(['/profile']);
      this.alertService.success('List has been added');
    } else {
      //TODO Update now sends unnecesary data, change to only send mutated values
      console.log('update content');
      this.contentListService
        .update(this.list.id, this.list)
        .subscribe(console.log);
      this.router.navigate(['/profile']);
      this.alertService.success('List has been updated');
    }
  }
}
