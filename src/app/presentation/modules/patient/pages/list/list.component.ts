import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PatientListHeaderComponent } from "../../components/list/patientListHeader/patientListHeader.component";
import { PatientListItemsComponent } from "../../components/list/patient-list-items/patient-list-items.component";
import { ActionType } from '../../../shared/enum/action';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { InputDateComponent } from '../../../shared/components/form-inputs/input-date/input-date.component';
import { Subject } from 'rxjs';
import { PatientService } from '../../../../../services/grapql/patient.service';
import { Patient } from '../../../../../models/patient.model';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    PatientListHeaderComponent,
    PatientListItemsComponent
],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent  implements OnInit {
  ngOnInit(): void {
    this.loadPatients();
  }
  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private cdr = inject(ChangeDetectorRef);
  private patientService = inject(PatientService);



  patients : Patient[] = [];


  onAddPatient(){
    const addUserForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Usuario',
        description: 'Especificaciones necesarias del usuario a agregar',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: 'usuario@sistema.com',
            title: 'email',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTextComponent,
          data: {
            placeholder: 'password',
            title: 'Password',
            id : 'password'
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component : InputTextComponent,
          data : {
            title : 'Nombres',
            placeholder : 'Agregar nombre',
            id : 'fullName'
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };
    const addForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Paciente',
        description: 'Es necesario ingresar el nombre del paciente',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: '1234567',
            title: 'Carnet de identidad',
            id : 'ic'
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTextComponent,
          data: {
            placeholder: 'Av. 24 de septiembre',
            title: 'Domicilio',
            id : 'address'
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTextComponent,
          data: {
            placeholder: 'telefono del paciente',
            title: 'Telefono',
            id : 'phone'
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputDateComponent,
          data : {
            placeholder: 'Fecha de nacimiento',
            title : 'Nacimiento',
            id : 'birthdate'
          },
          fieldFormControl: new FormControl(''),
        }
      ],
    };



    this.modalService.open(ModalFormComponent, {
      title: `Agregar Paciente`,
      size: 'sm',
      forms: [addUserForm,addForm],
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
      actions: [
        {
          action: ActionType.Create,
          title: 'Agregar',
        },
      ],
    }).subscribe((resp) =>  {


      const { ic, address, phone, birthdate, email, password, fullName } = responseModalFormMapper(resp);


      //Map birthdate to this 14-11-2002

      const birthDateMapped = new Date(birthdate).toISOString().split('T')[0].split('-').reverse().join('-');

      //take the reverse from 2002-11-14 to 14-11-2002


      const dto = {
        ic,
        address,
        phone,
        birthdate : birthDateMapped,
        user : {
          email,
          password,
          fullName
        }
      }


      this.createPatient(dto);

    })
  }




  async loadPatients( ) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.patientService.getAll();

    notifierDialog.next(0);

    if(!result.isSuccess){
      this.dialogService.showError({
        description: 'No se ha podido cargar los pacientes',
      });
      return;
    }

    this.patients = result.value;
    this.cdr.detectChanges();

  }

  async createPatient(dto : {[key:string] :any}){
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });


    const result = await this.patientService.create(dto);


    notifierDialog.next(0);

    if(!result.isSuccess){
      this.dialogService.showError({
        description: 'No se ha podido crear el paciente',
      });
      return;
    }


    this.patients = [...this.patients, result.value];

    this.dialogService.ShowSuccess({
      description: 'Paciente creado con éxito',
    });

    this.cdr.detectChanges();




  }


 }
