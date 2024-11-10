import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-specialties-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './specialties-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtiesHeaderComponent {
  @Output() onAddEvent = new EventEmitter();


  onAddToggle() {
    this.onAddEvent.emit();
  }

 }
