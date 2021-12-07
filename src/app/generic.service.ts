import { Injectable } from '@angular/core';
import { Observable, tap, pipe, map, throwError, catchError } from 'rxjs';
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
export class GenericService<T> {
  endpoint: string = environment.backendEndpoint;
  constructor(protected readonly http: HttpClient) {}
  update(id: string, item: T, route: string) {
    let completeRoute = `${this.endpoint}/${route}`;
    let params = new HttpParams().set('id', id);
    return this.http
      .put<T>(completeRoute, item, { ...httpOptions, params: params })
      .pipe(
        tap(console.log),
        map((response) => response.result),
        catchError(this.handleError)
      );
  }
  add(item: T, route: string) {
    let completeRoute = `${this.endpoint}/${route}`;
    return this.http.post<T>(completeRoute, item, { ...httpOptions }).pipe(
      tap(console.log),
      map((response) => response.result),
      catchError(this.handleError)
    );
  }
  getForId(id: string, route: string, mapfunction: any): Observable<T> {
    let completeRoute = `${this.endpoint}/${route}`;
    let params = new HttpParams().set('id', id);
    return this.http
      .get<T[]>(completeRoute, { ...httpOptions, params: params })
      .pipe(
        tap(console.log),
        map((response) => response.result),
        mapfunction,
        catchError(this.handleError)
      );
  }
  public deleteForId(id: string, route: string) {
    console.log('deleteForId');
    let completeRoute = `${this.endpoint}/${route}`;
    let params = new HttpParams().set('id', id);
    return this.http
      .delete(completeRoute, { ...httpOptions, params: params })
      .pipe(
        tap(console.log),
        map((response) => response.result),
        catchError(this.handleError)
      );
  }

  public getAll(
    route: string,
    mapfunction: any,
    options?: any
  ): Observable<T[]> {
    let completeRoute = `${this.endpoint}/${route}`;
    return this.http
      .get<T[]>(completeRoute, { ...options, ...httpOptions })
      .pipe(
        tap(console.log),
        map((response) => response.result),
        mapfunction,
        tap(console.log),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError(() => error);
  }
}
