import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { ContentInterface, ContentType, Content } from '../contentList.model';
import { ContentListService } from '../contentList.service';
import { ContentEditComponent } from './contentList-edit.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Directive, HostListener, Input } from '@angular/core';
@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}
describe('ContentEditComponent', () => {
  let component: ContentEditComponent;
  let fixture: ComponentFixture<ContentEditComponent>;
  let contentServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    contentServiceSpy = jasmine.createSpyObj('ContentService', ['getForId']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ContentEditComponent, RouterLinkStubDirective],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ContentService, useValue: contentServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 1 })),
          },
        },
        NgForm,
      ],
      imports: [FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ContentEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    contentServiceSpy.getForId.and.returnValue(
      of({
        id: 1,
        name: 'Spain Revealed',
        tags: ['spain', 'culture', 'madrid'],
        inProduction: true,
        platforms: [
          { name: 'Youtube', link: 'https://www.youtube.com/c/JamesBlick/' },
        ],
        contentInterface: ContentInterface.Video,
        contentType: ContentType.Videos,
        language: 'English',
        targetLanguage: 'Spanish',
      })
    );
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
