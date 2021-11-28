import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router, RouterModule} from '@angular/router';
import { of } from 'rxjs';
import { ContentInterface, ContentType,Content } from '../content.model';
import { ContentService } from '../content.service';
import { ContentEditComponent } from './content-edit.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Directive, Input } from '@angular/core';
@Directive({selector: '[routerLink]',})
export class RouterLinkStubDirective{
  @Input('routerLink') linkParams: any; navigatedTo: any = null;
  
}
describe('ContentEditComponent', () => {
  let component: ContentEditComponent;
  let fixture: ComponentFixture<ContentEditComponent>;
  let contentServiceSpy: any;
  let routerSpy : any;

  beforeEach(async () => {
    contentServiceSpy = jasmine.createSpyObj('ContentService',['getForId'])
    routerSpy = jasmine.createSpyObj('Router',['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [ ContentEditComponent,RouterLinkStubDirective ],
      providers: [ {provide: ContentService, useValue: contentServiceSpy},{
        provide: ActivatedRoute,
        useValue: {
            paramMap: of(convertToParamMap({id: 1}))
        }
  },
  {provide: Router,useValue: routerSpy}, NgForm],
  imports:[FormsModule,RouterModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contentServiceSpy = jasmine.createSpyObj('ContentService',['getForId'])
  });

  it('should create', () => {
    contentServiceSpy.getForId(1).and.returnValue(of({id: 1, name: "Spain Revealed",
    tags: ["spain", "culture","madrid"],
    inProduction: true,
    platforms: [{name: "Youtube",link: "https://www.youtube.com/c/JamesBlick/"}],
    contentInterface: ContentInterface.Video,
    contentType: ContentType.Videos,
    language: "English",
    targetLanguage: "Spanish"
  }))
  fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
