import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { DayNightModeService } from '../services/sharedDayAndNightMode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  get isDayMode(): boolean {
    return this.dayNightModeService.isDayMode;
  }

  
  constructor(protected authService: AuthService, private router: Router,  private cdr: ChangeDetectorRef, private dayNightModeService: DayNightModeService) {}
  toggleDayNightMode() {
    this.dayNightModeService.toggleMode();
    // You can apply the corresponding CSS classes to change the color scheme
    // or other styling based on the mode using ngClass or ngStyle.
  }
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

