import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './medication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicationComponent { }
