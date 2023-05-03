import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTI0OTM4YTdkNmI2ZWE1MDhhZjRjMiIsImVtYWlsIjoidGp2QHRhZ2xpbmVpbmZvdGVjaC5jb20iLCJyb2xlIjoidGVhY2hlciIsImlhdCI6MTY4MzExNDUyM30.MpGB3Bk7DmTHPh8_B-FOraFKY35NVRhgAoqn7TuMKXY';
    if (token)
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
    return next.handle(request);
  }
}
