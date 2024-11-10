import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../../../../../models/patient.model';
import { PatientItemComponent } from '../patient-item/patient-item.component';

@Component({
  selector: 'app-patient-list-items',
  standalone: true,
  imports: [
    CommonModule,
    PatientItemComponent,
  ],
  templateUrl: './patient-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListItemsComponent {

  @Input() patients! : Patient[];

  @Output() onSelectItem = new EventEmitter();



  onSelectTable(patient : Patient) {
    this.onSelectItem.emit(patient);
  }


 }
