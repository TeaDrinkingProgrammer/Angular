import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Directive, HostListener, Input } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ContentService } from '../../content/content.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { CommentService } from '../comment.service';
import { Comment } from '../comment.model';

import { CommentListComponent } from './comment-list.component';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';

@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let commentServiceSpy: jasmine.SpyObj<CommentService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy: any;
  beforeEach(async () => {
    commentServiceSpy = jasmine.createSpyObj('CommentService', [
      'getForId',
      'getForContentId',
      'update',
    ]);
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getForId']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authSpy = {
      currentUser$: new BehaviorSubject<User | undefined>({
        id: 'userId1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        token: 'alsdkjflaksdjf',
      }),
      CURRENT_USER: 'currentuser',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    await TestBed.configureTestingModule({
      declarations: [CommentListComponent],
      providers: [
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: 'asdf' })) },
        },
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
        { provide: AuthService, useValue: authSpy },
      ],
      imports: [FormsModule],
    }).compileComponents();
    commentServiceSpy = TestBed.inject(
      CommentService
    ) as jasmine.SpyObj<CommentService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //read comments into memory correctly
  fit('Comments should be stored correctly', () => {
    let comment1: Comment = {
      id: 'asdf49hjlfso83',
      user: 'userId1',
      commentText: 'I really like this channel',
      votes: ['userId1'],
      votesCount: 1,
    };
    let comment2: Comment = {
      id: 'nmkjcxvhjhi67345jhkjh',
      user: 'userId2',
      commentText: 'Thank you for making this',
      votes: ['userId2'],
      votesCount: 1,
    };
    let comments: Comment[] = [comment1, comment2];
    commentServiceSpy.getForContentId.and.returnValue(of(comments));
    userServiceSpy.getForId.and.returnValues(
      of({
        id: 'userId1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        token: 'alsdkjflaksdjf',
      }),
      of({
        id: 'userId2',
        firstName: 'Jan',
        lastName: 'Janssen',
        email: 'janjanssen@gmail.com',
        token: 'nhjkny5hikjfgnaioeuh4',
      })
    );
    component.contentId = 'contentId1';
    component.ngOnInit();
    expect(component.comments[0].userFirstName).toEqual('John');
    expect(component.comments[0].user).toEqual('userId1');
    expect(component.comments[1].userFirstName).toEqual('Jan');
    expect(component.comments[1].user).toEqual('userId2');
  });
  fit('Comments should be stored correctly', () => {
    let comment1: Comment = {
      id: 'asdf49hjlfso83',
      user: 'userId1',
      commentText: 'I really like this channel',
      votes: ['userId1'],
      votesCount: 1,
    };
    let comment2: Comment = {
      id: 'nmkjcxvhjhi67345jhkjh',
      user: 'userId2',
      commentText: 'Thank you for making this',
      votes: ['userId2'],
      votesCount: 1,
    };
    let comments: Comment[] = [comment1, comment2];
    commentServiceSpy.getForContentId.and.returnValue(of(comments));
    commentServiceSpy.update.and.returnValue(
      of({
        id: 'asdf49hjlfso83',
        user: 'userId1',
        commentText: 'I do not like this channel at all!',
        votes: ['userId1'],
        votesCount: 1,
      })
    );
    userServiceSpy.getForId.and.returnValues(
      of({
        id: 'userId1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        token: 'alsdkjflaksdjf',
      }),
      of({
        id: 'userId2',
        firstName: 'Jan',
        lastName: 'Janssen',
        email: 'janjanssen@gmail.com',
        token: 'nhjkny5hikjfgnaioeuh4',
      })
    );
    component.contentId = 'contentId1';
    component.ngOnInit();
    component.newComment = {
      id: 'asdf49hjlfso83',
      user: 'userId1',
      commentText: 'I do not like this channel at all!',
      votes: ['userId1'],
      votesCount: 1,
    };
    component.editOnSubmit('asdf49hjlfso83');
    expect(component.comments[0].userFirstName).toEqual('John');
    expect(component.comments[0].user).toEqual('userId1');
    expect(component.comments[1].userFirstName).toEqual('Jan');
    expect(component.comments[1].user).toEqual('userId2');
    expect(commentServiceSpy.update).toHaveBeenCalled();
  });
});
