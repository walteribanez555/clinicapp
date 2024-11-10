import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-patient-list-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './patientListHeader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListHeaderComponent {


  @Output() onAddEvent = new EventEmitter();


  onAddToggle() {
    this.onAddEvent.emit();
  }



 }
