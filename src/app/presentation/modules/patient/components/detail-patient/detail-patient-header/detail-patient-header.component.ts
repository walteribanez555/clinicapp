import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detail-patient-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './detail-patient-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPatientHeaderComponent { }
