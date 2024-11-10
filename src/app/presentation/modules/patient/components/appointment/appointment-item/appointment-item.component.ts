import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-appointment-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointment-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentItemComponent { }
