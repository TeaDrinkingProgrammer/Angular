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
  add(item: Content) {}
  getForId(id: string): Observable<Content> {
    return of();
  }
  deleteForId(id: string): boolean {
    return true;
  }

  public getAll(options?: any): Observable<Content[]> {
    const endpoint = environment.backendEndpoint + '/content';
    //, { ...options, ...httpOptions }
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
