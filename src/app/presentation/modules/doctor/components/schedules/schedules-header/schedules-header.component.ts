import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-schedules-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './schedules-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulesHeaderComponent {
  @Output() onAddEvent = new EventEmitter();


  onAddToggle() {
    this.onAddEvent.emit();
  }

 }
