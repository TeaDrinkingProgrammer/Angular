import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ContentList } from './contentList.model';
import { GenericService } from 'src/app/generic.service';
@Injectable({
  providedIn: 'root',
})
export class ContentListService {
  route: string = 'content-list';
  constructor(private genericService: GenericService<ContentList>) {}
  update(id: string, item: any) {
    return this.genericService.update(id, item, this.route);
  }
  add(item: ContentList) {
    return this.genericService.add(item, this.route, true);
  }
  getForId(id: string): Observable<ContentList> {
    return this.genericService.getForId(id, this.route);
  }
  public deleteForId(id: string) {
    console.log('deleteForId');
    return this.genericService.deleteForId(id, this.route, true);
  }

  public getAll(options?: any): Observable<ContentList[]> {
    return this.genericService.getAll(this.route, undefined, options);
  }
  public getForUserId(id: string, options?: any): Observable<ContentList[]> {
    let localOptions = options ? options : {};
    localOptions.userId = id;
    return this.genericService.getAll(this.route, undefined, options);
  }
}
