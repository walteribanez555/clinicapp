import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Specialty } from '../../../../../../models/specialty.model';
import { SpecialtyItemComponent } from '../specialty-item/specialty-item.component';

@Component({
  selector: 'app-specialty-list-items',
  standalone: true,
  imports: [
    CommonModule,
    SpecialtyItemComponent,
    NgClass,
  ],
  templateUrl: './specialty-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtyListItemsComponent {

  @Input() specialties! : Specialty[];

  @Output() onItemSelected = new EventEmitter();



  onSelectTable(item : Specialty) {
    this.onItemSelected.emit(item);
  }

 }
