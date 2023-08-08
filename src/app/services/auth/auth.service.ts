import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Simulated authentication state
  private isAuthenticatedValue: boolean = false;

  // Method to set the authentication state
  setAuthenticated(value: boolean): void {
    this.isAuthenticatedValue = value;
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }
}