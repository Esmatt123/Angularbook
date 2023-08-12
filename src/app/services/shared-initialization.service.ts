import { Injectable } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedInitializationService {
  constructor(private bookService: BookService) {}

  async initialize() {
    // Load initial data and perform necessary initializations
    const books = await firstValueFrom(this.bookService.getBooks());
    return books;
  }
}