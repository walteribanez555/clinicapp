import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Specialty } from '../../../../../../models/specialty.model';

@Component({
  selector: '[specialty-item]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialty-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtyItemComponent implements OnInit {
  ngOnInit(): void {
  }

  @Input() specialty!: Specialty;
}
