import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../auth/login/login.component';
import { LoginModalComponent } from 'src/auth/login-modal/login-modal.component'
import { RegisterModalComponent } from 'src/auth/register/register-modal/register-modal.component';
import { BookCrudComponent } from './book-crud/book-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/AuthGuard';
import { AuthService } from './services/auth/auth.service';
import { BookFormComponent } from './book-crud/book-form/book-form.component';
import { BookDetailComponent } from './book-crud/book-detail/book-detail.component';
import { BookListComponent } from './book-crud/book-list/book-list.component';
import { QuoteListComponent } from './book-crud/quote-list/quote-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginModalComponent,
    RegisterModalComponent,
    BookCrudComponent,
    BookFormComponent,
    BookDetailComponent,
    BookListComponent,
    QuoteListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
