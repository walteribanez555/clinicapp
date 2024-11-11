import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../../../../../../models/appointment.model';
import { AppointmentItemComponent } from '../appointment-item/appointment-item.component';

@Component({
  selector: 'app-appointment-list-items',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentItemComponent,
  ],
  templateUrl: './appointment-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentListItemsComponent {

  @Input() appointments! : Appointment[];

  @Output() itemSelected = new EventEmitter();


  onSelectTable(appointment : Appointment) {
    this.itemSelected.emit(appointment);
  }


 }
