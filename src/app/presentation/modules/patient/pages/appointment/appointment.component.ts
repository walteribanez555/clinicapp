import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { AppointmentHedaerComponent } from "../../components/appointment/appointment-hedaer/appointment-hedaer.component";
import { AppointmentListItemsComponent } from "../../components/appointment/appointment-list-items/appointment-list-items.component";
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
export class AppointmentComponent {
  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);

  ngAfterViewInit(): void {
    this.onItemSelected();
  }
  @ViewChild(DcDirective) dcWrapper!: DcDirective;




  onItemSelected(){
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      AppointmentDetailComponent,
    );
    // componentFactory.instance.outputdetailListener = this.outputDetailListener;
    // componentFactory.instance.outputProduct = outputProduct;

    this.onShowItem = true;
  }



  schedules: ItemList[] = [
    {
      id: 1,
      name :'Horario-1',
    },
    {
      id : 2,
      name :'Horario-2',
    },
  ]

  patients : ItemList[] = [
    {
      id : 1,
      name : 'Paciente-1',
    },
    {
      id : 2,
      name : 'Paciente-2'
    },
    {
      id : 3,
      name : 'Paciente-2'
    },
    {
      id : 4,
      name : 'Paciente-2'
    }
  ]


  onAddAppointment(){
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
            items : this.schedules
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component : InputSelectComponent,
          data : {
            title : 'Paciente',
            items : this.patients
          },
          fieldFormControl : new FormControl('')
        }
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
 }
