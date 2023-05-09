import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `\nClient Side Error: \nMessage:${error.error.message}`;
        } else {
          if (error.status >= 400 && error.status <= 500) {
            this.snackBar.open(error.error.error, 'OK', { duration: 5000 });
          }
          if (error.status >= 500) {
            this.snackBar.open(
              `It's not you, it's us. \nServer error - Please try after some time.`,
              'OK',
              { duration: 5000 }
            );
          }
          errorMessage = `\nServer Error ===== Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      })
    );
  }
}
