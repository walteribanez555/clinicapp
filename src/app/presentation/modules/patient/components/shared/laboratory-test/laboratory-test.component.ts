import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-laboratory-test',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './laboratory-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaboratoryTestComponent { }
