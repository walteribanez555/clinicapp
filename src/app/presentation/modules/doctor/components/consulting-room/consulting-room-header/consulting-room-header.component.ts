import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-consulting-room-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './consulting-room-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultingRoomHeaderComponent {

  @Output() onAddEvent = new EventEmitter();


  onAddToggle() {
    this.onAddEvent.emit();
  }

}
