import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-appointment-hedaer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointment-hedaer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentHedaerComponent {


  @Output() onAddEvent = new EventEmitter();


  onAddToggle() {
    this.onAddEvent.emit();
  }

 }
