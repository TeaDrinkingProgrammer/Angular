import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { ContentList } from '../contentList.model';
import { ContentListService } from '../contentList.service';
import { ContentListEditComponent } from './contentList-edit.component';
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
describe('ContentListEditComponent', () => {
  let component: ContentListEditComponent;
  let fixture: ComponentFixture<ContentListEditComponent>;
  let contentServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    contentServiceSpy = jasmine.createSpyObj('ContentService', ['getForId']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ContentListEditComponent, RouterLinkStubDirective],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ContentListService, useValue: contentServiceSpy },
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
    fixture = TestBed.createComponent(ContentListEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    contentServiceSpy.getForId.and.returnValue();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
