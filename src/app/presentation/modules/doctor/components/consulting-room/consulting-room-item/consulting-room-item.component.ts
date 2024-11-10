import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConsultingRoom } from '../../../../../../models/consultingRoom.model';

@Component({
  selector: '[consulting-room-item]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './consulting-room-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultingRoomItemComponent {

  @Input() consultingRoom! : ConsultingRoom;


 }
