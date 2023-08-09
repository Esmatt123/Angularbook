import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    
    if (authToken) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }

  isTokenExpired(): boolean {
    const token = this.authService.getAuthToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      return Date.now() >= expirationTime;
    }
    return true;
    }
}