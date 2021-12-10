import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private alertService: AlertService) {}
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    this.alertService.error(`Error: ${error}`);
    return throwError(() => error);
  }
}
