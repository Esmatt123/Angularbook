import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
  @Input() display: string = 'none';
  @Output() closeRegModal: EventEmitter<void> = new EventEmitter<void>();

  onCloseHandled() {
    this.display = 'none';
    this.closeRegModal.emit();
  }
}