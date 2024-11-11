import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SchedulesHeaderComponent } from '../../components/schedules/schedules-header/schedules-header.component';
import { ScheduleListItemsComponent } from '../../components/schedules/schedule-list-items/schedule-list-items.component';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { InputDateComponent } from '../../../shared/components/form-inputs/input-date/input-date.component';
import { InputFileComponent } from '../../../shared/components/form-inputs/input-file/input-file.component';
import { InputSelectComponent } from '../../../shared/components/form-inputs/input-select/input-select.component';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { ScheduleDetailComponent } from '../../components/schedules/schedule-detail/schedule-detail.component';
import { InputTimeComponent } from '../../../shared/components/form-inputs/input-time/input-time.component';
import { DoctorService } from '../../../../../services/grapql/doctor.service';
import { Doctor } from '../../../../../models/doctor.model';
import { Subject } from 'rxjs';
import { ConsultingRoom } from '../../../../../models/consultingRoom.model';
import { Specialty } from '../../../../../models/specialty.model';
import { CustomService } from '../../../../../services/grapql/custom.service';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { ScheduleService } from '../../../../../services/grapql/schedule.service';
import { Schedule } from '../../../../../models/schedule.model';
import { DetailListener } from '../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [
    CommonModule,
    SchedulesHeaderComponent,
    ScheduleListItemsComponent,
    DcDirective,
  ],
  templateUrl: './schedules.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulesComponent implements OnInit {
  ngOnInit(): void {


    const actualDayNumber = new Date().getDay();



    this.loadItemsLists();

    this.loadItems({dayOfWeek : actualDayNumber});


  }



  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  private scheduleService = inject(ScheduleService);
  private customQueriesService = inject(CustomService);
  private cdr = inject(ChangeDetectorRef);
  private dialogService = inject(DialogService);
  private modalService = inject(ModalService);

  // doctors : Doctor[] = [];
  // consultoringRooms : ConsultingRoom[] = [];
  // specialties : Specialty[] = [];

  doctors: ItemList[] = [];
  consultoringRooms: ItemList[] = [];
  specialties: ItemList[] = [];

  schedules : Schedule[] = [];

  daysOfWeek: ItemList[] = [
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miercoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sabado' },
    { id: 0, name: 'Domingo' },
  ];



  async loadItemsLists() {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result =
      await this.customQueriesService.loadDoctorsSpecialtiesConsultingRooms();

    notifierDialog.next(0);
    if (!result.isSuccess) {
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.doctors = result.value.doctors.map((doctor: any) => {
      return {
        id: doctor.id,
        name: doctor.user.fullName,
      };
    });

    this.consultoringRooms = result.value.consultingRooms.map((room: any) => {
      return {
        id: room.id,
        name: room.roomName,
      };
    });

    this.specialties = result.value.specialties.map((specialty: any) => {
      return {
        id: specialty.id,
        name: specialty.name,
      };
    });

    this.cdr.detectChanges();
  }

  onShowItem: boolean = false;

  onItemSelected(schedule :Schedule) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      ScheduleDetailComponent
    );

    componentFactory.instance.detailListener = this.detailListener;
    componentFactory.instance.schedule = schedule;

    // componentFactory.instance.outputdetailListener = this.outputDetailListener;
    // componentFactory.instance.outputProduct = outputProduct;

    this.onShowItem = true;
  }


  detailListener: DetailListener<Schedule> = {
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

          const { id, code, fullName, user_id, email } = form.value;

          const dto = {
            code,
            user: {
              id: user_id,
              fullName,
              email
            }
          }


          // this.updateDoctor(id,dto);

        });
    },

    delete: (id) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      this.dialogService
        .showAlert({ description: 'Estas seguro de realizar la eliminacion?' })
        .subscribe((resp) => {


        });
    },
  };


  onAddSchedule() {
    const detailForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Medico',
        description: 'Se necesita especificar los detalles del medico',
      },
      dynamicFields: [
        {
          component: InputSelectComponent,
          data: {
            title: 'Medico',
            items: this.doctors.map((doctor) => ({
              id: doctor.id,
              name: doctor.name,
            })),
            id: 'doctorId',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputSelectComponent,
          data: {
            title: 'Consultorio',
            items: this.consultoringRooms.map((room) => ({
              id: room.id,
              name: room.name,
            })),
            id: 'consultingRoomId',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputSelectComponent,
          data: {
            title: 'Especialidad',
            items: this.specialties.map((specialty) => ({
              id: specialty.id,
              name: specialty.name,
            })),
            id: 'specialityId',
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    const addForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Horario',
        description:
          'Se necesita especificar los detalles de los horarios a agregar',
      },
      dynamicFields: [
        {
          component: InputSelectComponent,
          data: {
            title: 'Dia de la Semana',
            items: this.daysOfWeek.map((day) => ({
              id: `${day.id}`,
              name: day.name,
            })),
            id: 'dayOfWeek',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTimeComponent,
          data: {
            placeholder: 'Horarios',
            title: 'Fecha Inicial',
            id: 'startTime',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTimeComponent,
          data: {
            placeholder: 'Horarios',
            title: 'Fecha Final',
            id: 'endTime',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTextComponent,
          data: {
            placeholder: '30',
            title: 'Duración (min)',
            id: 'slotDuration',
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    this.modalService
      .open(ModalFormComponent, {
        title: `Agregar Horario`,
        size: 'sm',
        forms: [detailForm, addForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Agregar',
          },
        ],
      })
      .subscribe((resp) => {
        const {
          dayOfWeek,
          slotDuration,
          startTime,
          endTime,
          doctorId,
          specialityId,
          consultingRoomId,
        } = responseModalFormMapper(resp);

        if (
          !dayOfWeek ||
          !slotDuration ||
          !startTime ||
          !endTime ||
          !doctorId ||
          !specialityId ||
          !consultingRoomId
        ) {
          this.dialogService.showError({
            description: 'No se ha especificado la especialidad',
          });
          return;
        }

        this.createSchedule({
          dayOfWeek : parseInt(dayOfWeek),
          slotDuration : parseInt(slotDuration),
          startTime,
          endTime,
          doctorId : parseInt(doctorId),
          specialityId: parseInt(specialityId),
          consultingRoomId : parseInt(consultingRoomId),
        });
      });
  }

  async createSchedule(inputs: { [key: string]: any }) {
    const notifierDialog: Subject<any> = new Subject();

    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });


    const result = await this.scheduleService.create(inputs);

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.schedules = [...this.schedules, result.value];

    this.dialogService.ShowSuccess({
      description: 'Horario agregado correctamente',
    });



    this.cdr.detectChanges();
  }


  async loadItems(params : {[key:string] :any}) {

    const notifierDialog: Subject<any> = new Subject();

    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });



    const result = await this.scheduleService.loadSchedules(params);


    notifierDialog.next(0);

    if(!result.isSuccess){
      this.dialogService.showError({description: result.error});
      return;
    }

    this.schedules = result.value;


    this.cdr.detectChanges();

  }


}
