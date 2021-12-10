import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.sass'],
})
export class CommentListComponent implements OnInit {
  @Input() contentId: string;
  clicked: boolean;
  comments: Comment[];
  newComment: Comment;
  loggedInUser: User;
  isOwner: boolean = false;
  isLoggedIn: boolean = false;
  editComment: Comment;
  finishedLoading: Observable<boolean> = of(false);
  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.commentService
          .getForContentId(this.contentId)
          .pipe(
            map((comments) => {
              comments.forEach((comment) => {
                this.userService
                  .getForId(comment.user)
                  .pipe(tap((log: any) => console.log('usertap: ', log)))
                  .subscribe((user) => {
                    comment.userFirstName = user.firstName;
                    comment.userLastName = user.lastName;
                    console.log(
                      'comment.user and currentuser: ',
                      comment.user,
                      ':',
                      currentUser.id
                    );
                    console.log('truthiness', comment.user == currentUser.id);
                    comment.user == currentUser.id
                      ? (comment.isOwner = true)
                      : (comment.isOwner = false);
                    if (comment.votes.includes(currentUser.id)) {
                      comment.likedByUser = true;
                    }
                    console.log('usernames: ', comment);
                  });
                console.log('comment: ', comment);
                return comment;
              });
              console.log('comments: ', comments);
              return comments;
            })
          )
          .subscribe((comments) => {
            console.log('subscribed comments: ', comments);
            this.comments = comments;
            new Promise(function (resolve, reject) {
              resolve('page loaded');
            });
            this.finishedLoading = of(true);
          });
      }
    });

    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.newComment = {
          id: '',
          user: user.id,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          commentText: 'Comment here',
          votes: [],
          votesCount: 0,
          likedByUser: false,
        };
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  onSubmit() {
    console.log('New Comment', this.newComment);
    let itemComment = this.newComment as any;
    itemComment.content = this.contentId;
    this.commentService.add(itemComment).subscribe((comment) => {
      this.comments.push(itemComment);
    });
  }
  like(id: string) {
    let comment = this.comments.find((item) => item.id == id);
    console.log('Like clicked:', comment);
    if (comment) {
      comment.likedByUser = !comment.likedByUser;
      if (comment.likedByUser) {
        let userId;
        this.authService.currentUser$.subscribe((user) => {
          userId = user?.id;
          if (userId && comment) {
            comment?.votes.push(userId);
            this.commentService
              .update(comment.id, comment)
              .subscribe((result) => console.log(result));
            comment.votesCount += 1;
          }
        });
      } else if (!comment.likedByUser) {
        this.authService.currentUser$.subscribe((user) => {
          let userId = user?.id;
          if (userId && comment) {
            comment.votes = comment.votes.filter((item) => item !== userId);
            this.commentService
              .update(comment.id, comment)
              .subscribe((result) => console.log(result));
            comment.votesCount -= 1;
          }
        });
      }
    }
  }
  deleteComment(id: string) {
    this.commentService.deleteForId(id).subscribe((comment) => {
      this.comments = this.comments.filter((item) => item.id != id);
    });
  }
  edit(id: string) {
    let comment = this.comments.find((item) => item.id == id);
    console.log('edited comment', comment);

    if (comment) {
      this.editComment = comment;
      comment.edit = true;
    }
  }
  editOnSubmit(id: string) {
    this.commentService.update(id, this.editComment).subscribe(() => {
      let comment = this.comments.find((item) => item.id == id);
      if (comment) comment.edit = false;
    });
  }
}
