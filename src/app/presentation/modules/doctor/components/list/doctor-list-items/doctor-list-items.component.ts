import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../../../../../models/doctor.model';
import { DoctorItemComponent } from '../doctor-item/doctor-item.component';

@Component({
  selector: 'app-doctor-list-items',
  standalone: true,
  imports: [
    CommonModule,
    DoctorItemComponent,
  ],
  templateUrl: './doctor-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorListItemsComponent {


  @Input() doctors! : Doctor[];
  @Output() onSelectItem = new EventEmitter();

  constructor() { }

  onSelectTable(doctor: Doctor){
    this.onSelectItem.emit(doctor);
  }


 }
