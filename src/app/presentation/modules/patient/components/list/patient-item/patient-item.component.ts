import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Patient } from '../../../../../../models/patient.model';

@Component({
  selector: '[patient-item]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './patient-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientItemComponent {


  @Input() patient! : Patient;

 }
