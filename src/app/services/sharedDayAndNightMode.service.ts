import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DayNightModeService {
  isDayMode: boolean = true; // Initial mode is day

  toggleMode() {
    this.isDayMode = !this.isDayMode;
  }
}