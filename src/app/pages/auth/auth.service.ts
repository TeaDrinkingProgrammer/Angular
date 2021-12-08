import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  Subscription,
  throwError,
} from 'rxjs';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
// import { AlertService } from '../shared/alert/alert.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // id: number;
  // userName: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  public currentUser$ = new BehaviorSubject<User>({} as User);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    // private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    // Check of we al een ingelogde user hebben
    // Zo ja, check dan op de backend of het token nog valid is.
    // Het token kan namelijk verlopen zijn. Indien verlopen
    // retourneren we meteen een nieuw token.
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: User) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(email: string, password: string): Observable<User> {
    console.log(`login at ${environment.backendEndpoint}/auth/login`);

    return this.http
      .post<User>(
        `${environment.backendEndpoint}/auth/login`,
        { email: email, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          //TODO fix alertservice
          // this.alertService.success('You have been logged in');
          return user;
        }),
        catchError(this.handleError)
      );
  }

  register(userData: User): Observable<User> {
    const url = `${environment.backendEndpoint}/auth/register`;
    console.log(`register at url`);
    console.log(userData);
    return this.http
      .post<any>(url, userData, {
        headers: this.headers,
      })
      .pipe(
        switchMap((response: any) => {
          return of(response.result as User);
        }),
        map((user) => {
          // const user = new User(response);
          console.dir(user);
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          // this.alertService.success('You have been registered');
          return user;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
  validateToken(userData: User): Observable<User> {
    const url = `${environment.backendEndpoint}/auth/profile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      }),
    };

    console.log(`validateToken at ${url}`);
    return this.http.get<User>(url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next({} as User);
          // this.alertService.success('You have been logged out.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<User> {
    let localItem = localStorage.getItem(this.CURRENT_USER);
    if (localItem) {
      const localUser = JSON.parse(localItem);
      return of(localUser);
    }
    return of({} as User);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: User) => (user ? user.id === itemUserId : false))
    );
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError(() => error);
  }
}
