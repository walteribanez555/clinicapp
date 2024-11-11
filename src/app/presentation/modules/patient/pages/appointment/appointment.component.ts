import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { AppointmentHedaerComponent } from '../../components/appointment/appointment-hedaer/appointment-hedaer.component';
import { AppointmentListItemsComponent } from '../../components/appointment/appointment-list-items/appointment-list-items.component';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { InputSelectComponent } from '../../../shared/components/form-inputs/input-select/input-select.component';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { AppointmentDetailComponent } from '../../components/appointment/appointment-detail/appointment-detail.component';
import { AppointmentsService } from '../../../../../services/grapql/appointments.service';
import { Subject } from 'rxjs';
import { Appointment } from '../../../../../models/appointment.model';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { InputDateComponent } from '../../../shared/components/form-inputs/input-date/input-date.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentHedaerComponent,
    NgClass,
    AppointmentListItemsComponent,
    DcDirective,
  ],
  templateUrl: './appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent  implements OnInit {
  ngOnInit(): void {
    this.loadItems();
  }
  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private cdr = inject(ChangeDetectorRef);
  private appointmentsService = inject(AppointmentsService);


  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  onItemSelected() {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      AppointmentDetailComponent
    );
    // componentFactory.instance.outputdetailListener = this.outputDetailListener;
    // componentFactory.instance.outputProduct = outputProduct;

    this.onShowItem = true;
  }

  schedules: ItemList[] = [
    {
      id: 1,
      name: 'Horario-1',
    },
    {
      id: 2,
      name: 'Horario-2',
    },
  ];

  patients: ItemList[] = [
    {
      id: 1,
      name: 'Paciente-1',
    },
    {
      id: 2,
      name: 'Paciente-2',
    },
    {
      id: 3,
      name: 'Paciente-2',
    },
    {
      id: 4,
      name: 'Paciente-2',
    },
  ];

  appointments : Appointment[] = [];


  onAddAppointment() {
    const addForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Cita',
        description: 'Espeficicaciones necesarias de la cita a agregar',
      },
      dynamicFields: [
        {
          component: InputSelectComponent,
          data: {
            title: 'Cita',
            items: this.schedules,
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputSelectComponent,
          data: {
            title: 'Paciente',
            items: this.patients,
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    this.modalService.open(ModalFormComponent, {
      title: `Agregar Cita`,
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
    });
  }

  async loadItems() {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.appointmentsService.getItems();

    notifierDialog.next(0);

    if(!result.isSuccess){
      this.dialogService.showError({
        description: result.error,
      });
      return;
    }

    this.appointments = result.value;

    this.cdr.detectChanges();


  }

  onGenerateReport() {
    const reportForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Parametros de Reporte',
        description: 'Filtros necesarios para generar el reporte',
      },
      dynamicFields: [
        // {
        //   component: InputSelectComponent,
        //   data: {
        //     title: 'Almacen',
        //     items: this.warehouses$().map((warehouse) => {
        //       return {
        //         id: warehouse.warehouse_id,
        //         name: warehouse.name,
        //       };
        //     }),
        //   },
        //   fieldFormControl: new FormControl(),
        // },

        {
          component: InputDateComponent,
          data: {
            title: 'Inicio',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputDateComponent,
          data: {
            title: 'Fin',
          },
          fieldFormControl: new FormControl(),
        },
      ],
    };

    this.modalService
      .open(ModalFormComponent, {
        title: `Generar Reporte`,
        size: 'sm',
        forms: [reportForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Generar',
          },
        ],
      })
      .subscribe({
        next: (resp) => {
          const response = responseModalFormMapper(resp);

          const responseMapped: any = {
            product_type_id: response.Producto,
            init: response.Inicio,
            end: response.Fin,

          };

          const params = Object.keys(responseMapped).reduce(
            (acc: any, key: string) => {
              if (
                responseMapped[key] !== null &&
                responseMapped[key] !== undefined
              ) {
                acc[key] = responseMapped[key];
              }
              return acc;
            },
            {}
          );

          // this.inputFacadeService.createReport(params);
        },
        error: (err) => {
          console.log({ err });
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }

}
