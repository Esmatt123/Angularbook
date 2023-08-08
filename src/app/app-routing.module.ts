import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { BookCrudComponent } from './book-crud/book-crud.component';
import { AuthGuard } from './guards/AuthGuard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'bookcrud', component: BookCrudComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
