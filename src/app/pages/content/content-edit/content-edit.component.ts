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
import { ContentService } from '../content.service';
import {
  ContentInterface,
  ContentType,
  Content,
  Platform,
} from '../content.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
interface Tag {
  value: string;
  display: string;
}
@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.sass'],
})
export class ContentEditComponent implements OnInit {
  private route: ActivatedRoute;
  private contentService: ContentService;
  private subscription?: Subscription;
  public content: Content;
  public contentInterfaces: string[] = Object.keys(ContentInterface);
  public contentTypes: string[] = Object.keys(ContentType);
  public tags: Tag[] = [];
  private router: Router;
  constructor(
    contentRepo: ContentService,
    route: ActivatedRoute,
    router: Router
  ) {
    this.contentService = contentRepo;
    this.route = route;
    this.router = router;
    this.content = {
      id: '-1',
      name: 'Name here',
      tags: [''],
      inProduction: false,
      platforms: [],
      contentInterface: ContentInterface.Either,
      contentType: ContentType.Videos,
      language: 'English',
      user: '',
    };
  }

  ngOnInit(): void {
    //TODO two way binding met map werkt niet
    console.log('contentinterfaces: ', this.contentInterfaces);
    this.subscription = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          if (!params.get('id') ?? 'null') {
            return of({
              name: 'Name here',
              tags: [],
              inProduction: false,
              platforms: [],
              contentInterface: ContentInterface.Either,
              contentType: ContentType.Videos,
              language: 'English',
            });
          } else {
            return this.contentService.getForId(params.get('id') ?? '-1');
          }
        }),
        tap(console.log)
      )
      .subscribe((content) => {
        this.content = content;
      });
  }
  onSubmit(): void {
    if (!this.content.id) {
      console.log('create content');

      this.tags.forEach((item) => {
        this.content.tags.push(item.value);
        console.log(item);
      });
      this.content.user = '61ae43fe50046fca2e25e8bb';
      console.log('item sent to service:', this.content);
      //!! Temporary before auth gets implemented
      this.content.user = '61ae43fe50046fca2e25e8bb';
      this.contentService.add(this.content).subscribe(console.log);
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      console.log('update content');
      this.contentService.update(this.content.id, this.content);
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
  addPlatformFields() {
    console.log(this.content.platforms);
    this.content.platforms.push({ name: '', link: '' });
    console.log(this.content.platforms);
  }
  deletePlatformField(index: number) {
    this.content.platforms.splice(index, 1);
    console.log(this.content.platforms);
  }
  platformChange(event: string, platform: any, isKey: boolean) {
    console.log(this.content.platforms);
    if (isKey) {
      let arrayItem = this.content.platforms.find(
        (item) => item.name === platform.name
      );
      if (arrayItem != undefined) {
        arrayItem.name = event;
      }
    } else {
      let arrayItem = this.content.platforms.find(
        (item) => item.link === platform.link
      );
      if (arrayItem != undefined) {
        arrayItem.link = event;
      }
    }
    console.log('log items:');
    console.log('event: ', event);
    console.log('platform: ', platform);
    console.log(this.content.platforms);
    console.log(this.content);
  }
  onTagRemoved(event: any) {
    console.log('event:', event);
    console.log(event);
    // this.content.tags[event.length-1] = event[event.length-1].value
    // this.content.tags = this.content.tags.filter(e => e !== event.value)
    var index = this.content.tags.indexOf(event);
    if (index !== -1) {
      this.content.tags.splice(index, 1);
    }
    // this.content.tags = event;
    console.log(this.content.tags);
  }
  onTagAdded(event: any) {
    this.content.tags.push(event.value);
    console.log(this.content.tags);
  }
  getEntities(): any {
    // this will return [['first', { text: 'abc' }], ... ]
    // and after mapping we get [{ text: 'abc' }, ...]
    // return Array.from(this.content.platforms.entries()).map(item => item[1]);
    return Array.from(this.content.platforms.entries());
  }
}
