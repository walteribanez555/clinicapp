import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointment-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentDetailComponent {

  close(){
  }
}
