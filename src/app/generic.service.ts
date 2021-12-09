import { Injectable } from '@angular/core';
import { Observable, tap, pipe, map, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { AuthService } from './pages/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  endpoint: string = environment.backendEndpoint;
  subscriptionOptions: any;
  userId: string;
  httpOptions: any = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  constructor(
    protected readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}
  private auth() {
    this.subscriptionOptions = this.authService.currentUser$.subscribe(
      (user) => {
        if (user) {
          console.log('userid:', user.id);
          this.userId = user.id;
          this.httpOptions = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + user.token,
            },
          };
        }
      }
    );
  }
  update(id: string, item: any, route: string, auth: boolean = true) {
    console.log('generic update');
    if (auth) {
      this.auth();
      console.log('update header: ', this.httpOptions);
    }
    console.log('generic update item: ', item);
    let completeRoute = `${this.endpoint}/${route}`;
    let params = new HttpParams().set('id', id);
    return this.http
      .put<T>(completeRoute, item, { ...this.httpOptions, params: params })
      .pipe(
        tap(console.log),
        map((response) => response.result),
        catchError(this.handleError)
      );
  }
  add(item: T, route: string, auth: boolean) {
    if (auth) {
      this.auth();
    }
    console.log('authheader:', this.httpOptions);
    let completeRoute = `${this.endpoint}/${route}`;
    return this.http.post<T>(completeRoute, item, { ...this.httpOptions }).pipe(
      tap(console.log),
      map((response) => response.result),
      catchError(this.handleError)
    );
  }
  getForId(id: string, route: string, mapfunction?: any): Observable<T> {
    let completeRoute = `${this.endpoint}/${route}`;
    let params = new HttpParams().set('id', id);
    if (mapfunction) {
      return this.http
        .get<T[]>(completeRoute, { ...this.httpOptions, params: params })
        .pipe(
          tap(console.log),
          map((response) => response.result),
          mapfunction,
          catchError(this.handleError)
        );
    } else {
      return this.http
        .get<T[]>(completeRoute, { ...this.httpOptions, params: params })
        .pipe(
          tap(console.log),
          map((response) => response.result),
          catchError(this.handleError)
        );
    }
  }
  public deleteForId(id: string, route: string, auth: boolean = true) {
    if (auth) {
      this.auth();
    }
    console.log('deleteForId');
    let completeRoute = `${this.endpoint}/${route}`;
    let params = new HttpParams().set('id', id);
    return this.http
      .delete(completeRoute, { ...this.httpOptions, params: params })
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
    console.log('getall');
    let completeRoute = `${this.endpoint}/${route}`;
    if (mapfunction) {
      return this.http
        .get<T[]>(completeRoute, { ...options, ...this.httpOptions })
        .pipe(
          tap(console.log),
          map((response) => response.result),
          mapfunction,
          tap(console.log),
          catchError(this.handleError)
        );
    } else {
      return this.http
        .get<T[]>(completeRoute, { params: options, ...this.httpOptions })
        .pipe(
          tap(console.log),
          map((response) => response.result),
          tap(console.log),
          catchError(this.handleError)
        );
    }
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError(() => error);
  }
}
