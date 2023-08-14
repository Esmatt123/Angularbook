import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginModal: boolean = false;
  registerModal: boolean = false; // Declare the registerModal property

  
  ngOnInit() {
  }

  openLoginModal() {
    this.loginModal = true;
    console.log('button was pressed', this.loginModal)
  }

  closeLoginModal() {
    this.loginModal = false;
  }
  
  openRegisterModal() {
    this.registerModal = true;
  }
  
  closeRegisterModal() {
    this.registerModal = false;
  }
}