import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './patient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent { }
