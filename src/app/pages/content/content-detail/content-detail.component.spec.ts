import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import {  of, Subscription} from 'rxjs';
import { ContentService } from '../content.service';
import { ContentInterface, ContentType } from '../content.model';
import { ContentDetailComponent } from './content-detail.component';
import { Directive, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Directive({selector: '[routerLink]',})
export class RouterLinkStubDirective{
  @Input('routerLink') linkParams: any; navigatedTo: any = null;
  
}
describe('ContentDetailComponent', () => {
  let component: ContentDetailComponent;
  let fixture: ComponentFixture<ContentDetailComponent>;
  let contentService : any;
  let contentServiceSpy : any;
  let routerSpy : any;
  beforeEach(async () => {
    contentServiceSpy = jasmine.createSpyObj('ContentService',['getForId'])
    routerSpy = jasmine.createSpyObj('Router',['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [ ContentDetailComponent,RouterLinkStubDirective ],
      providers: [{provide: ContentService, useValue: contentServiceSpy},
        {provide: ActivatedRoute,useValue: {
            paramMap: of(convertToParamMap({id: 1}))
        }
      },
    {provide: Router,useValue: routerSpy}],
    imports:[RouterModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ContentDetailComponent);
    component = fixture.componentInstance;
  });

  beforeEach( () => {
    contentServiceSpy = jasmine.createSpyObj('ContentService',['getForId'])
    contentServiceSpy.getForId.and.returnValue(of({id: 1, name: "Spain Revealed",
    tags: ["spain", "culture","madrid"],
    inProduction: true,
    platforms: [{name: "Youtube",link: "https://www.youtube.com/c/JamesBlick/"}],
    contentInterface: ContentInterface.Video,
    contentType: ContentType.Videos,
    language: "English",
    targetLanguage: "Spanish"
  }));
    fixture = TestBed.createComponent(ContentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //TODO fix this
  xit('should create', () => {
  // contentService.getForId(1).subscribe((item : any)=> console.log(item))
  fixture.detectChanges();
  expect(component).toBeTruthy();
  });
});
