import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../auth/login/login.component';
import { LoginModalComponent } from 'src/auth/login-modal/login-modal.component'
import { RegisterModalComponent } from 'src/auth/register/register-modal/register-modal.component';
import { BookCrudComponent } from './book-crud/book-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/AuthGuard';
import { AuthService } from './services/auth/auth.service';
import { BookDetailComponent } from './book-crud/book-detail/book-detail.component';
import { BookListComponent } from './book-crud/book-list/book-list.component';
import { QuoteListComponent } from './book-crud/quote-list/quote-list.component';
import { EditFormComponent } from './book-crud/book-form/edit-form/edit-form.component';
import { AddBookFormComponent } from './book-crud/book-form/add-book-form/add-book-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginModalComponent,
    RegisterModalComponent,
    BookCrudComponent,
    BookDetailComponent,
    BookListComponent,
    QuoteListComponent,
    EditFormComponent,
    AddBookFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    AuthGuard, 
    AuthService, 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
