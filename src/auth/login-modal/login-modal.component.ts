import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() display: string = 'none';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
}