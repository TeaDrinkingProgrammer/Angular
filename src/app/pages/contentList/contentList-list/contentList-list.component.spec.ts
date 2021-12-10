import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListListComponent } from './contentList-list.component';

describe('UserListComponent', () => {
  let component: ContentListListComponent;
  let fixture: ComponentFixture<ContentListListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentListListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
