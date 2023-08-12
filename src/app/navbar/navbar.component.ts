import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  constructor(protected authService: AuthService, private router: Router,  private cdr: ChangeDetectorRef) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log("dropdown open")
    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.clearAuthToken();
    this.router.navigate(['/']); // Redirect to the login page
    this.isDropdownOpen = false;
  }
}

