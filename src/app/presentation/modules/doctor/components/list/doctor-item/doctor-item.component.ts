import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Doctor } from '../../../../../../models/doctor.model';

@Component({
  selector: '[doctor-item]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './doctor-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorItemComponent {
  @Input() doctor!: Doctor;


}
