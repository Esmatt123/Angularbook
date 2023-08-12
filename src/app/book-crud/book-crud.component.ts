import { Component, OnInit, ViewChild } from '@angular/core';
import { AddBookFormComponent } from './book-form/add-book-form/add-book-form.component';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-crud',
  templateUrl: './book-crud.component.html',
  styleUrls: ['./book-crud.component.css']
})
export class BookCrudComponent{
  
}
