import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConsultingRoom } from '../../../../../../models/consultingRoom.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-consulting-room-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './consulting-room-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultingRoomDetailComponent {
  ngOnInit(): void {
    this.consultingRoomForm = new FormGroup({
      roomLocation : new FormControl(this.consultingRoom.roomLocation),
      roomName : new FormControl(this.consultingRoom.roomName),
      id : new FormControl(this.consultingRoom.id)
    })
  }


  @Input()  consultingRoom! : ConsultingRoom
  @Input() detailListener! : DetailListener<ConsultingRoom>;


  consultingRoomForm= new FormGroup({
    id : new FormControl(),
    roomLocation: new FormControl(),
      roomName :new FormControl(),
  })


  close(){
    this.detailListener.close();
  }

  onSubmit(){
    this.detailListener.submit(this.consultingRoomForm);
  }

  onDelete() {
    this.detailListener.delete(this.consultingRoom.id);
  }
 }
