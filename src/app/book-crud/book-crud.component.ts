import { Component} from '@angular/core';
import { DayNightModeService } from '../services/sharedDayAndNightMode.service';

@Component({
  selector: 'app-book-crud',
  templateUrl: './book-crud.component.html',
  styleUrls: ['./book-crud.component.css']
})
export class BookCrudComponent{
  constructor(protected dayNightModeService: DayNightModeService){}

  get isDayMode(): boolean {
    return this.dayNightModeService.isDayMode;
  }
}
