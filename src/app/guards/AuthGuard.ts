import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard canActivate method called');
  
    if (this.authService.isAuthenticated()) {
      if (this.authService.isTokenExpired()) {
        console.log('Token is expired, navigating to login page');
        this.router.navigate(['']);
        return false;
      }
  
      console.log('Proceeding with route activation');
      return true;
    }
  
    console.log('User is not authenticated, navigating to login page');
    this.router.navigate(['']);
    return false;
  }
  
}
