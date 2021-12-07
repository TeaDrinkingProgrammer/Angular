import { Injectable } from '@angular/core';
import {
  delay,
  filter,
  from,
  Observable,
  tap,
  pipe,
  of,
  Subject,
  switchMap,
  take,
  map,
  throwError,
  catchError,
} from 'rxjs';
import { Content, ContentInterface, ContentType } from './content.model';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  // observe: 'body',
  // responseType: 'json',
};
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(protected readonly http: HttpClient) {}
  update(id: string, item: Content) {
    let params = new HttpParams().set('id', id);
    const endpoint = environment.backendEndpoint + '/content';
    let sentItem: any = item;
    sentItem.contentInterface = sentItem.contentInterface
      .toString()
      .toLowerCase();
    sentItem.contentType = sentItem.contentType.toString().toLowerCase();
    delete sentItem.id;
    return this.http
      .put<Content>(endpoint, item, { ...httpOptions, params: params })
      .pipe(
        tap(console.log),
        map((response) => response.result),
        catchError(this.handleError)
      );
  }
  add(item: Content) {
    const endpoint = environment.backendEndpoint + '/content';
    let sentItem: any = item;
    sentItem.contentInterface = sentItem.contentInterface
      .toString()
      .toLowerCase();
    sentItem.contentType = sentItem.contentType.toString().toLowerCase();
    return this.http.post<Content>(endpoint, item, { ...httpOptions }).pipe(
      tap(console.log),
      map((response) => response.result),
      catchError(this.handleError)
    );
  }
  getForId(id: string): Observable<Content> {
    let params = new HttpParams().set('id', id);
    const endpoint = environment.backendEndpoint + '/content';
    return this.http
      .get<Content[]>(endpoint, { ...httpOptions, params: params })
      .pipe(
        tap(console.log),
        map((response) => response.result),
        map((result) => {
          //TODO this is kind of hacky and inefficient
          result.contentInterface =
            result.contentInterface[0].toUpperCase() +
            result.contentInterface.substr(1).toLowerCase();
          result.contentType =
            result.contentType[0].toUpperCase() +
            result.contentType.substr(1).toLowerCase();
          return result;
        }),
        catchError(this.handleError)
      );
  }
  public deleteForId(id: string) {
    console.log('deleteForId');
    let params = new HttpParams().set('id', id);
    const endpoint = environment.backendEndpoint + '/content';
    return this.http.delete(endpoint, { ...httpOptions, params: params }).pipe(
      tap(console.log),
      map((response) => response.result),
      catchError(this.handleError)
    );
  }

  public getAll(options?: any): Observable<Content[]> {
    const endpoint = environment.backendEndpoint + '/content';
    return this.http
      .get<Content[]>(endpoint, { ...options, ...httpOptions })
      .pipe(
        tap(console.log),
        map((response) => response.result),
        map((result) => {
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
        tap(console.log),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError(() => error);
  }
}
