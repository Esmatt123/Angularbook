import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() display: string = 'none';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  onSubmit(email: string, password: string) {
    this.apiService.login(email, password).subscribe({
      next: (response: any) => {
        // Handle successful login here
        console.log('The login was successful', response);
  
        const token = response.token; // Extract the token from the response
        const expiresIn = 3600; // Set an arbitrary expiration time (e.g., 1 hour)
        
        this.authService.setAuthToken(token, expiresIn);
  
        // Redirect to the bookcrud page
        this.router.navigate(['/bookcrud']).catch(error => {
          console.error('Router Navigation Error:', error);
        });
      },
      error: (error) => {
        // Handle login error here
        console.log("Login error", error);
      }
    });
  }
  onCloseHandled() {
    this.display = 'none';
    this.closeModal.emit();
  }

}