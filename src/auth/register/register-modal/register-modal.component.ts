import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
  @Input() display: string = 'none';
  @Output() closeRegModal: EventEmitter<void> = new EventEmitter<void>();
  newUser: { 
    email: string;
    password: string;
    displayName: string;
    userName: string;
    
  } = {
    email: '',
    password: '', 
    displayName: '',
    userName: ''
  };
  confirmPassword: string = ''; // Initialize with an empty string
  passwordsMatch: boolean = true;
  usernameValid: boolean = true;
  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) { } 
  
  onCloseHandled() {
    this.display = 'none';
    this.closeRegModal.emit();
  }


  registerUser() {
    const {email, displayName, userName, password} = this.newUser;
    this.passwordsMatch = password === this.confirmPassword;

    

    if (!this.passwordsMatch || !this.usernameValid) {
      // Display an error message or handle the mismatch
      return;
    }

    this.apiService.registerUser(
      email, 
      password,
      displayName,
      userName).subscribe({
      next: (response) => {
        // Registration successful
        console.log('Registration successful:', response);
        
        // Automatically log in the user after successful registration
        this.apiService.login(email, password).subscribe({
          next: (loginResponse: any) => {
            // Login successful
            console.log('Login successful:', loginResponse);
            // You might want to emit an event to notify a parent component
            // or reset the newUser object

            const token = loginResponse.token; // Extract the token from the response
        const expiresIn = 3600; // Set an arbitrary expiration time (e.g., 1 hour)
        
        this.authService.setAuthToken(token, expiresIn);
            this.router.navigate(['/bookcrud']);
          },
          error: (loginError) => {
            // Login after registration failed
            console.error('Login after registration failed:', loginError);
            // Handle the error or provide feedback to the user
          }
        });
  
        // Additional logic or feedback to the user
        // You might want to emit an event to notify a parent component
        // or reset the newUser object
      },
      error: (error) => {
        // Registration failed
        console.error('Registration failed:', error);
        // Handle the error or provide feedback to the user
      }
    });
  }

  checkUsernameValidity() {
    this.usernameValid = !this.newUser.userName.includes(' ');
  }
 
  
}
