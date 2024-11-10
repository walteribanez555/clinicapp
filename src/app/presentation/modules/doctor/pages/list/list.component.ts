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
import { ListHeaderComponent } from '../../components/list/list-header/list-header.component';
import { DoctorListItemsComponent } from '../../components/list/doctor-list-items/doctor-list-items.component';
import { ModalService } from '../../../shared/services/Modal.service';
import { DialogService } from '../../../shared/services/Dialog.service';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';
import { InputSelectComponent } from '../../../shared/components/form-inputs/input-select/input-select.component';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { DoctorDetailComponent } from '../../components/list/doctor-detail/doctor-detail.component';
import { GraphQLQueryBuilder } from '../../../../../services/GraphQlQueryBuilder';
import { environment } from '../../../../../../environments/environment';
import { DoctorService } from '../../../../../services/grapql/doctor.service';
import { Doctor } from '../../../../../models/doctor.model';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { Subject } from 'rxjs';
import { DetailListener } from '../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ListHeaderComponent,
    DoctorListItemsComponent,
    DcDirective,
  ],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterViewInit, OnInit {


  doctors : Doctor[] = [];


  ngOnInit(): void {

    this.loadItems();

    // this.createDoctor()
  }
  ngAfterViewInit(): void {
  }
  @ViewChild(DcDirective) dcWrapper!: DcDirective;


  detailListener: DetailListener<Doctor> = {
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


          this.updateDoctor(id,dto);

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


  onItemSelected(doctor : Doctor) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      DoctorDetailComponent
    );
    componentFactory.instance.doctor = doctor;
    componentFactory.instance.detailListener = this.detailListener;

    // componentFactory.instance.outputdetailListener = this.outputDetailListener;
    // componentFactory.instance.outputProduct = outputProduct;

    this.onShowItem = true;
  }




  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private doctorService = inject(DoctorService);
  private cdr = inject(ChangeDetectorRef);



  onAddDoctor() {
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
            id : 'email'
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTextComponent,
          data: {
            placeholder: 'password',
            title: 'Password',
            id: 'password',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTextComponent,
          data: {
            title: 'Nombre',
            placeholder: 'Agregar nombre',
            id : 'fullName'
          },
          fieldFormControl: new FormControl(''),
        },

      ],
    };

    const addForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Doctor',
        description:
          'Se necesita especificar los detalles del doctor a agregar',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: '0000X0000',
            title: 'Codigo',
            id: 'code',
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    this.modalService.open(ModalFormComponent, {
      title: `Agregar Doctor`,
      size: 'sm',
      forms: [addUserForm, addForm],
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
      actions: [
        {
          action: ActionType.Create,
          title: 'Agregar',
        },
      ],
    }).subscribe((resp) => {
      const { email, password, fullName, code } = responseModalFormMapper(resp);


      const dto = {
        code,
        user: {
          fullName,
          email,
          password
        }
      }


      this.createDoctor(dto);



    })
  }


  async loadItems() {

    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.doctorService.getAll();


    notifierDialog.next(0);
    if(!result.isSuccess){
      this.dialogService.showError({description: result.error});
      return;
    }


    this.doctors = result.value;

    this.cdr.detectChanges();


  }


  async createDoctor(dto : {[key:string] :any}) {

    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });


    const result =  await this.doctorService.create(dto);


    notifierDialog.next(0);

    if(!result.isSuccess){
      this.dialogService.showError({description: result.error});
      return;
    }


    this.doctors = [...this.doctors, result.value];

    this.cdr.detectChanges();

    this.dialogService.ShowSuccess({description: 'Doctor creado exitosamente'});
  }


  async updateDoctor(id: string, fields: { [key: string]: any }) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.doctorService.update(id, fields);
    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.doctors = this.doctors.map((doctor) => {
      if (doctor.id === id) {
        return result.value;
      }
      return doctor;
    });



    this.dialogService.ShowSuccess({
      description: 'Consultorio actualizado con éxito',
    });

    this.cdr.detectChanges();

  }


  async deleteDoctor(id :string){

      const notifierDialog: Subject<any> = new Subject();
      this.dialogService.showLoading({
        description: 'Cargando',
        listener: notifierDialog,
      });

      const result = await this.doctorService.delete(id);

      notifierDialog.next(0);

      if (!result.isSuccess) {
        this.dialogService.showError({ description: result.error });
        return;
      }

      this.doctors = this.doctors.filter((doctor) => doctor.id !== id);

      this.dialogService.ShowSuccess({
        description: 'Doctor eliminado con éxito',
      });

      this.cdr.detectChanges();
  }
}
