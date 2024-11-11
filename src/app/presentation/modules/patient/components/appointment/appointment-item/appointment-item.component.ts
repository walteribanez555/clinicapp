import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Appointment } from '../../../../../../models/appointment.model';

@Component({
  selector: '[appointment-item]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointment-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentItemComponent {

  @Input() appointment!: Appointment;

}
