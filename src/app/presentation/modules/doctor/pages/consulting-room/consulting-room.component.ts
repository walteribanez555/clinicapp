import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ConsultingRoomDetailComponent } from '../../components/consulting-room/consulting-room-detail/consulting-room-detail.component';
import { FormControl } from '@angular/forms';
import { InputSelectComponent } from '../../../shared/components/form-inputs/input-select/input-select.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { ActionType } from '../../../shared/enum/action';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { ConsultingRoomHeaderComponent } from "../../components/consulting-room/consulting-room-header/consulting-room-header.component";
import { ConsultingRoomService } from '../../../../../services/grapql/consulting-room.service';
import { Subject } from 'rxjs';
import { ConsultingRoom } from '../../../../../models/consultingRoom.model';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { ConsultingRoomItemsComponent } from "../../components/consulting-room/consulting-room-items/consulting-room-items.component";
import { DetailListener } from '../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-consulting-room',
  standalone: true,
  imports: [
    CommonModule,
    DcDirective,
    ConsultingRoomHeaderComponent,
    ConsultingRoomItemsComponent
],
  templateUrl: './consulting-room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultingRoomComponent implements OnInit {

  listParams : string[] = ["id", "roomName", "roomLocation"];



  ngOnInit(): void {
    this.loadConsultingRooms(this.listParams.reduce((acc: any, key) => {
      acc[key] = true;
      return acc;
    }, {}));
  }
  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private consultingRoomService = inject(ConsultingRoomService);
  private cdr = inject(ChangeDetectorRef);

  consultingRooms : ConsultingRoom[] = [];
  error: any;



  ngAfterViewInit(): void {
    // this.onItemSelected();
  }
  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  detailListener: DetailListener<ConsultingRoom> = {
    close: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    cancel: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    submit: (form) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      this.dialogService
        .showAlert({ description: 'Estas seguro de realizar la modificacion?' })
        .subscribe((resp) => {
          const { id,roomLocation, roomName  } = form.value;
          this.updateConsultingRoom(id, { id, roomLocation, roomName });
        });
    },

    delete: (id) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      this.dialogService
        .showAlert({ description: 'Estas seguro de realizar la eliminacion?' })
        .subscribe((resp) => {
          this.removeConsultingRoom(`${id}`);
        });
    },
  };




  onItemSelected(consultingRoom : ConsultingRoom){
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      ConsultingRoomDetailComponent
    );

    componentFactory.instance.consultingRoom = consultingRoom;
    componentFactory.instance.detailListener = this.detailListener;

    this.onShowItem = true;
  }





  onAddConsultingRoom(){
    const addForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Consultorios',
        description: 'Espeficicaciones necesarias del consultorio a agregar',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            title: 'Nombre de la Sala',
            placeholder: 'Sala 1',
            id : 'roomName'
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component : InputTextComponent,
          data : {
            title : 'Ubicacion',
            placeholder: 'Piso 1 - Sala 1',
            id : 'roomLocation'
          },
          fieldFormControl : new FormControl('')
        }
      ],
    };



    this.modalService.open(ModalFormComponent, {
      title: `Agregar Consultorio`,
      size: 'sm',
      forms: [addForm],
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
      actions: [
        {
          action: ActionType.Create,
          title: 'Agregar',
        },
      ],
    }).subscribe((resp) => {

      const { roomName, roomLocation } = responseModalFormMapper(resp);

      if (!roomName || !roomLocation) {
        this.dialogService.showError({
          description: 'No se ha especificado la especialidad',
        });
        return;
      }

      this.addConsultingRoom({
        roomName,
        roomLocation
      });



    })



  }

  async loadConsultingRooms(fields: { [key: string]: any }) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.consultingRoomService.getAll(fields);

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.consultingRooms = result.value;

    // this.dialogService.ShowSuccess({ description: 'Especialidades cargadas con éxito' });

    this.cdr.detectChanges();
  }



  async loadConsultingRoom(id: string, fields: { [key: string]: any }) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.consultingRoomService.getById(id, fields);

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.consultingRooms = result.value;

    this.dialogService.ShowSuccess({
      description: 'Consultorio cargada con éxito',
    });
    this.cdr.detectChanges();
  }

  async addConsultingRoom(inputs : {[key : string] : any}) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.consultingRoomService.create(
      inputs,


      this.listParams.reduce((acc: any, key) => {
        acc[key] = true;
        return acc;
      }, {})


    );

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      return;
    }



    this.consultingRooms = [...this.consultingRooms, result.value];

    this.dialogService.ShowSuccess({
      description: 'Consultorio agregado con éxito ',
    });

    this.cdr.detectChanges();
  }

  async updateConsultingRoom(id: string, fields: { [key: string]: any }) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.consultingRoomService.update(id, fields, this.listParams.reduce((acc: any, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.consultingRooms = this.consultingRooms.map((s) =>
      `${s.id}` === id ? result.value : s
    );

    this.dialogService.ShowSuccess({
      description: 'Consultorio actualizado con éxito',
    });

    this.cdr.detectChanges();

  }

  async removeConsultingRoom(id: string) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.consultingRoomService.delete(id);

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      // return;
    }

    this.consultingRooms = this.consultingRooms.filter((s) => `${s.id}` !== id);

    this.dialogService.ShowSuccess({
      description: 'Consultorio eliminado con éxito',
    });

    this.cdr.detectChanges();

  }
 }
