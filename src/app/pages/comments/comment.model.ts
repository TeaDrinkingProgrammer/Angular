export class Comment {
  id: string;
  user: string;
  userFirstName?: string;
  userLastName?: string;
  commentText: string;
  votes: string[];
  votesCount: number;
  likedByUser?: boolean;
  edit?: boolean = false;
  isOwner?: boolean = false;
}
