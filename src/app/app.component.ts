import { Component } from '@angular/core';
import { DayNightModeService } from './services/sharedDayAndNightMode.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  get isDayMode(): boolean{
    return this.dayNightModeService.isDayMode
  }
  title: string = "client-app"
  constructor(protected dayNightModeService: DayNightModeService){}
}