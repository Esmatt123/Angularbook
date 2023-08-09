import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly EXPIRY_KEY = 'expiry';

  constructor() {}

  setAuthToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
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