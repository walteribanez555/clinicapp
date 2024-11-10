import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-diagnostic-image',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './diagnostic-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagnosticImageComponent { }
