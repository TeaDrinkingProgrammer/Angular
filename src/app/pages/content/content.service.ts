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
  update(id: string, value: Content) {}
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
        tap(console.log),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError(() => error);
  }
}
