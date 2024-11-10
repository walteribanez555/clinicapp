import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-appointment-list-items',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointment-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentListItemsComponent { }
