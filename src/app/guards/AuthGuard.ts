import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('AuthGuard is called');
      // User is authenticated, no need to set isAuthenticated to true here

      // Proceed with route activation
      return true;
    }

    // User is not authenticated, navigate to the login page
    this.router.navigate(['']);
    return false;
  }
}