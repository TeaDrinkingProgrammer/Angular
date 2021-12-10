import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericService } from 'src/app/shared/services/generic.service';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  route: string;
  constructor(private genericService: GenericService<Comment>) {
    this.route = 'comment';
  }
  update(id: string, item: any) {
    return this.genericService.update(id, item, this.route);
  }
  add(item: Comment) {
    return this.genericService.add(item, this.route, true);
  }
  getForId(id: string): Observable<Comment> {
    console.log('route here: ', this.route);
    return this.genericService.getForId(id, this.route);
  }
  public deleteForId(id: string) {
    return this.genericService.deleteForId(id, this.route, true);
  }

  public getAll(options?: any): Observable<Comment[]> {
    return this.genericService.getAll(this.route, undefined, options);
  }
  public getForContentId(id: string, options?: any): Observable<Comment[]> {
    let localOptions = options ? options : {};
    localOptions.contentId = id;
    return this.genericService.getAll(this.route, undefined, options);
  }
}
