import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { Comment } from './comment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user.model';

describe('CommentService', () => {
  let service: CommentService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy: any;
  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    });
    authSpy = {
      currentUser$: new BehaviorSubject<User | undefined>({
        id: 'sdlkfjalskdjfl',
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
    authSpy.currentUser$.subscribe;
    service = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    // authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Add
  fit('should create a new comment', (done: DoneFn) => {
    let sentComment: Comment = {
      id: 'asdf49hjlfso83',
      user: 'nikgjhiuh3823bmjhguyt',
      commentText: 'I really like this channel',
      votes: ['09823hlkjhdfs7'],
      votesCount: 1,
    };
    httpSpy.post.and.returnValue(of({ result: sentComment }));
    service.add(sentComment).subscribe((comment: Comment) => {
      expect(sentComment.id).toEqual(comment.id);
      expect(sentComment.user).toEqual(comment.user);
      done();
    });
  });

  // GetForId
  fit('should get one comment', (done: DoneFn) => {
    let sentComment: Comment = {
      id: '0',
      user: '1',
      commentText: 'A comment',
      votes: [],
      votesCount: 0,
    };
    httpSpy.get.and.returnValue(of({ result: sentComment }));
    // authSpy.currentUser$.and.returnValue({
    //   id: 'lksadjflkasj',
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   email: 'johndoe@gmail.com',
    //   token: 'lkjhasdfluawlsjkdfhklasdjhfgi4y498yhfgkeagf',
    // });
    service.getForId(sentComment.id).subscribe((comment: Comment) => {
      console.log('test 2:', comment);
      expect(comment.commentText).toBe('A comment');
      expect(comment.votes.length).toBe(0);
      done();
    });
  });

  //GetAll
  fit('should get multiple comments', (done: DoneFn) => {
    let sentComment1: Comment = {
      id: 'nmkjcxvhjhi67345jhkjh',
      user: 'jbonkhjntkjh38457t638hug',
      commentText: 'Thank you for making this',
      votes: ['09823hlkjhdfs7'],
      votesCount: 1,
    };
    let sentComment2: Comment = {
      id: 'lkasndfkjngijhkh5',
      user: 'askdjfnbghj354iu36y4389higj',
      commentText: 'Very nice channel',
      votes: ['asdfbjklort98y979'],
      votesCount: 1,
    };
    let sentCommentList: Comment[] = [sentComment1, sentComment2];
    httpSpy.get.and.returnValue(of({ result: sentCommentList }));

    service.getAll().subscribe((commentList: Comment[]) => {
      expect(commentList.length).toBe(2);
      expect(commentList[0].commentText).toBe('Thank you for making this');
      done();
    });
  });

  // Update
  fit('should update an existing comment', (done: DoneFn) => {
    let sentComment: Comment = {
      id: 'nmkjcxvhjhi67345jhkjh',
      user: 'jbonkhjntkjh38457t638hug',
      commentText: 'Thank you for making this',
      votes: ['09823hlkjhdfs7'],
      votesCount: 1,
    };
    httpSpy.put.and.returnValue(of({ result: sentComment }));

    service
      .update(sentComment.id, sentComment)
      .subscribe((comment: Comment) => {
        expect(comment.commentText).toEqual('Thank you for making this');
        expect(comment.votesCount).toEqual(1);
        done();
      });
  });
  //DeleteForId
  fit('should delete an existing comment', (done: DoneFn) => {
    let sentComment: Comment = {
      id: 'nmkjcxvhjhi67345jhkjh',
      user: 'jbonkhjntkjh38457t638hug',
      commentText: 'Thank you for making this',
      votes: ['09823hlkjhdfs7'],
      votesCount: 1,
    };
    httpSpy.delete.and.returnValue(of({ result: sentComment }));

    service.deleteForId(sentComment.id).subscribe((comment: Comment) => {
      expect(comment.id).toBe('nmkjcxvhjhi67345jhkjh');
      expect(comment.user).toBe('jbonkhjntkjh38457t638hug');
      done();
    });
  });
});
