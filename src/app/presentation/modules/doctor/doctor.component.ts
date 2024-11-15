import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './doctor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorComponent { }
