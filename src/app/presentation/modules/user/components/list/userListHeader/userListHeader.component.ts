import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-list-header',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './userListHeader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListHeaderComponent {

  @Output() onAddEvent = new EventEmitter();


  onAddToggle() {
    this.onAddEvent.emit();
  }



 }
