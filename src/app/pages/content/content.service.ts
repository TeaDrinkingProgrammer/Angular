import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Content } from './content.model';
import { GenericService } from 'src/app/shared/services/generic.service';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  route: string = 'content';
  constructor(private genericService: GenericService<Content>) {}
  update(id: string, item: Content) {
    let sentItem: any = item;
    sentItem.contentInterface = sentItem.contentInterface
      .toString()
      .toLowerCase();
    sentItem.contentType = sentItem.contentType.toString().toLowerCase();
    delete sentItem.id;
    return this.genericService.update(id, sentItem, this.route);
  }
  add(item: Content) {
    let sentItem: any = item;
    sentItem.contentInterface = sentItem.contentInterface
      .toString()
      .toLowerCase();
    sentItem.contentType = sentItem.contentType.toString().toLowerCase();
    return this.genericService.add(item, this.route, true);
  }
  getForId(id: string): Observable<Content> {
    return this.genericService.getForId(
      id,
      this.route,
      map((result: any) => {
        //TODO this is kind of hacky and inefficient
        result.contentInterface =
          result.contentInterface[0].toUpperCase() +
          result.contentInterface.substr(1).toLowerCase();
        result.contentType =
          result.contentType[0].toUpperCase() +
          result.contentType.substr(1).toLowerCase();
        return result;
      })
    );
  }
  public deleteForId(id: string) {
    console.log('deleteForId');
    return this.genericService.deleteForId(id, this.route, true);
  }

  public getAll(options?: any): Observable<Content[]> {
    return this.genericService.getAll(
      this.route,
      map((result: any) => {
        //TODO this is kind of hacky and inefficient
        result.forEach((element: any) => {
          element.contentInterface =
            element.contentInterface[0].toUpperCase() +
            element.contentInterface.substr(1).toLowerCase();
          element.contentType =
            element.contentType[0].toUpperCase() +
            element.contentType.substr(1).toLowerCase();
          return element;
        });
        return result;
      }),
      options
    );
  }
}
