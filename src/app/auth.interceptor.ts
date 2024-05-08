import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from wherever you store it (localStorage, service, etc.)
    const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(req);
    }

    // Clone the request and add the token header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Pass the cloned request instead of the original request to the next handler
    return next.handle(authReq);
  }
}
