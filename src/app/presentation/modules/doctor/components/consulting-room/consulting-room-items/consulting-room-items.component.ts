import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ConsultingRoom } from '../../../../../../models/consultingRoom.model';
import { ConsultingRoomItemComponent } from '../consulting-room-item/consulting-room-item.component';

@Component({
  selector: 'app-consulting-room-items',
  standalone: true,
  imports: [
    CommonModule,
    ConsultingRoomItemComponent,
  ],
  templateUrl: './consulting-room-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultingRoomItemsComponent {

  @Input() consultingRooms! : ConsultingRoom[];

  @Output() onSelectItem = new EventEmitter();



  onSelectTable(item : ConsultingRoom) {
    this.onSelectItem.emit(item);
  }


 }
