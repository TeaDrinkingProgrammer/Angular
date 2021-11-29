import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { ContentService } from '../content.service';
import { ContentInterface, ContentType } from '../content.model';
import { ContentDetailComponent } from './content-detail.component';
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
describe('ContentDetailComponent', () => {
  let component: ContentDetailComponent;
  let fixture: ComponentFixture<ContentDetailComponent>;
  let contentServiceSpy: any;

  beforeEach(() => {
    contentServiceSpy = jasmine.createSpyObj('ContentService', ['getForId']);
    TestBed.configureTestingModule({
      declarations: [ContentDetailComponent, RouterLinkStubDirective],
      providers: [
        { provide: ContentService, useValue: contentServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 1 })),
          },
        },
      ],
      imports: [],
    }).compileComponents();
    fixture = TestBed.createComponent(ContentDetailComponent);
    component = fixture.componentInstance;
  });

  afterAll(() => {
    fixture.destroy();
  });
  xit('should create', () => {
    const stubValue = {
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
    };
    contentServiceSpy.getForId.and.returnValue(of(stubValue));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
