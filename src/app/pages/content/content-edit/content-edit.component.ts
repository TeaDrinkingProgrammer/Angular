import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TagInputForm} from 'ngx-chips';
import { Observable, ObservableNotification, of, Subscription, switchMap, tap } from 'rxjs';
import { ContentRepoService } from '../content-repo.service';
import { ContentInterface, ContentType, Content } from '../content.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
interface Tag {
  value: string,
  display : string
}
@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.sass']
})

export class ContentEditComponent implements OnInit {
  private route : ActivatedRoute;
  private contentService: ContentRepoService
  private subscription? : Subscription
  public content : Content
  public contentInterfaces : string[] = Object.keys(ContentInterface)
  public contentTypes : string[] = Object.keys(ContentType)
  public tags : Tag[] = []
  private router : Router
  constructor(contentRepo : ContentRepoService,route : ActivatedRoute, router : Router) {
    this.contentService = contentRepo;
    this.route = route;
    this.router = router;
    this.content = ({
      id: 0,
      name: 'Name here',
      tags: [''],
      inProduction: false,
      platforms: new Map([["",""]]),
      contentInterface: ContentInterface.Either,
      contentType: ContentType.Videos,
      language: "English",
    })
   }

  ngOnInit(): void {
    //TODO two way binding met map werkt niet
    this.subscription = this.route.paramMap.pipe(
      tap(console.log),
      switchMap((params: ParamMap) => {
        if(!params.get('id') ?? 'null'){
          return of({
              id: -1,
              name: 'Name here',
              tags: [],
              inProduction: false,
              platforms: new Map([["",""]]),
              contentInterface: ContentInterface.Either,
              contentType: ContentType.Videos,
              language: "English",
            })
        } else {
          return this.contentService.getForId(parseInt(params.get('id') ?? '-1',10))
        }
      }),
      tap(console.log)
    ).subscribe((content) => {
      this.content = content;
    })
  }
  onSubmit(): void{
    if(this.content.id === -1){
      console.log("create content");

      this.tags.forEach((item) => {this.content.tags.push(item.value); console.log(item)})
      console.log(this.content)
      this.contentService.pushItem(this.content)
      this.router.navigate(['..'],{relativeTo: this.route})
    } else {
      console.log("update content");
      this.contentService.setOption(this.content.id, this.content)
      this.router.navigate(['..'],{relativeTo: this.route})
    }
  }
  addPlatformFields() {
    this.content.platforms.get("key");
    console.log(this.content.platforms)
    return this.content.platforms.set('','');
  }
  deletePlatformField(key : string){
    this.content.platforms.delete(key);
    console.log(key)
    console.log(this.content.platforms)
  }
}