import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lsTokenName } from '../constants/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenExpiredInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorage.removeItem(lsTokenName);
            this.router.navigateByUrl('/auth');
          }
        }
      }),
    );
  }
}
