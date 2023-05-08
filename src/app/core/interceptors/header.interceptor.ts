import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    const token = localStorage.getItem('token');
    if (token)
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
    return next.handle(request).pipe(finalize(() => this.spinner.hide()));
  }
}
