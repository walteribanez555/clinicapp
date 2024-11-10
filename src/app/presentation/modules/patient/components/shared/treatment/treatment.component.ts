import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-treatment',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './treatment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreatmentComponent { }
