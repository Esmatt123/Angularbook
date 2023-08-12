import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRY_KEY = 'expiry';

  constructor() {}

  setAuthToken(token: string, expiresIn: number): void {
    const expirationDate = new Date().getTime() + expiresIn * 1000; // Convert to milliseconds
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRY_KEY, expirationDate.toString());
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getExpiryDate(): Date | null {
    const expiryTimestamp = localStorage.getItem(this.EXPIRY_KEY);
    if (expiryTimestamp) {
      return new Date(+expiryTimestamp); // Convert timestamp to Date object
    }
    return null;
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    const expiryDate = this.getExpiryDate();

    if (token && expiryDate && expiryDate > new Date()) {
      return true; // Token is present and not expired
    }
    return false;
  }

  isTokenExpired(): boolean {
    const expiryDate = this.getExpiryDate();
    if (expiryDate && expiryDate <= new Date()) {
      return true; // Token is expired
    }
    return false;
  }

  getUserDisplayName(): string | null {
    const token = this.getAuthToken();
    if (token) {
      const payload = this.decodeTokenPayload(token); // You need to implement this method
      return payload.name; // Replace with the actual property name
    }
    return null;
  }
  decodeTokenPayload(token: string): any {
    try {
      return jwtDecode.default(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
