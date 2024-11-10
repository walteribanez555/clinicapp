import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild, inject } from '@angular/core';
import { UserListHeaderComponent } from "../../components/list/userListHeader/userListHeader.component";
import { UserListItemsComponent } from "../../components/list/user-list-items/user-list-items.component";
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { SelectComponent } from '../../../shared/components/custom-inputs/select/select.component';
import { InputSelectComponent } from '../../../shared/components/form-inputs/input-select/input-select.component';
import { UserDetailComponent } from '../../components/list/user-detail/user-detail.component';
import { DcDirective } from '../../../shared/directives/dc.directive';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    UserListHeaderComponent,
    UserListItemsComponent,
    DcDirective,
],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.onItemSelected();
  }

  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  @ViewChild(DcDirective) dcWrapper!: DcDirective;



  onItemSelected(){
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      UserDetailComponent,
    );
    // componentFactory.instance.outputdetailListener = this.outputDetailListener;
    // componentFactory.instance.outputProduct = outputProduct;

    this.onShowItem = true;
  }

  rols : ItemList[] = [
    {
      id : 1,
      name :'Default',
    },
    {
      id: 2,
      name: 'Doctor',
    },
    {
      id : 3,
      name : 'Paciente'
    }
  ]

  userTypes : ItemList[] =[
    {
      id :1,
      name : 'Interno'
    },
    {
      id : 2,
      name : 'Invitado'
    }
  ]


  onAddUser(){
    const addForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Detalles del nuevo usuario a agregar',
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
          },
          fieldFormControl: new FormControl(''),
        },

        {
          component :InputSelectComponent,
          data : {
            title: 'Rol',
            items : this.rols
          },
          fieldFormControl : new FormControl(''),
        },
        {
          component: InputSelectComponent,
          data : {
            title : 'Tipo',
            items : this.userTypes
          },
          fieldFormControl : new FormControl(''),
        },
        {
          component : InputTextComponent,
          data : {
            title : 'Nombres',
            placeholder : 'Agregar nombre'
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component : InputTextComponent,
          data : {
            title: 'Apellidos',
            placeholder : 'Apellidos'
          },
          fieldFormControl: new FormControl('')
        },
      ],
    };



    this.modalService.open(ModalFormComponent, {
      title: `Agregar Usuario`,
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
