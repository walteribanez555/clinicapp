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
import { SpecialtiesHeaderComponent } from '../../components/specialties/specialties-header/specialties-header.component';
import { SpecialtyListItemsComponent } from '../../components/specialties/specialty-list-items/specialty-list-items.component';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { SpecialtyDetailComponent } from '../../components/specialties/specialty-detail/specialty-detail.component';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { SpecialtyService } from '../../../../../services/grapql/specialities.service';
import { Subject } from 'rxjs';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { Specialty } from '../../../../../models/specialty.model';
import { DetailListener } from '../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [
    CommonModule,
    SpecialtiesHeaderComponent,
    SpecialtyListItemsComponent,
    DcDirective,
  ],
  templateUrl: './specialties.component.html',
})
export class SpecialtiesComponent implements OnInit, AfterViewInit {
  constructor() {}

  listParams: string[] = ['id', 'name'];

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadSpecialties(
      this.listParams.reduce((acc: any, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
  }
  ngAfterViewInit(): void {
    // this.onItemSelected();
  }

  detailListener: DetailListener<Specialty> = {
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
          const { id, name } = form.value;
          this.updateSpecialty(id, { id, name });
        });
    },

    delete: (id) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      this.dialogService
        .showAlert({ description: 'Estas seguro de realizar la eliminacion?' })
        .subscribe((resp) => {
          this.removeSpecialty(`${id}`);
        });
    },
  };

  specialties: Specialty[] = [];
  error: any;

  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private specialtyService = inject(SpecialtyService);

  onItemSelected(specialty: Specialty) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      SpecialtyDetailComponent
    );

    componentFactory.instance.specialty = specialty;
    componentFactory.instance.detailListener = this.detailListener;

    this.onShowItem = true;
  }

  onAddSpecialty() {
    const addForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Detalles de la nueva especialidad a agregar',
        description:
          'Se necesita especificar los detalles de la especialidad a agregar',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: 'Cirugia General',
            title: 'Especialidad',
            id: 'specialty',
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    this.modalService
      .open(ModalFormComponent, {
        title: `Agregar Especialidad`,
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
      })
      .subscribe({
        next: (resp) => {
          const { specialty } = responseModalFormMapper(resp);

          if (!specialty) {
            this.dialogService.showError({
              description: 'No se ha especificado la especialidad',
            });
            return;
          }

          this.addSpecialty(specialty);
        },
        error: (err) => {
          this.dialogService.showError({
            description: 'Error al agregar la especialidad',
          });
        },
        complete: () => {},
      });
  }

  async loadSpecialties(fields: { [key: string]: any }) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.specialtyService.getSpecialties(fields);

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.specialties = result.value;

    // this.dialogService.ShowSuccess({ description: 'Especialidades cargadas con éxito' });

    this.cdr.detectChanges();
  }

  async loadSpecialty(id: string, fields: { [key: string]: any }) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.specialtyService.getspecialityById(id, fields);

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.specialties = result.value;

    this.dialogService.ShowSuccess({
      description: 'Especialidad cargada con éxito',
    });
    this.cdr.detectChanges();
  }

  async addSpecialty(name: string) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.specialtyService.createspeciality(
      { name },


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



    this.specialties = [...this.specialties, result.value];

    this.dialogService.ShowSuccess({
      description: 'Especialidad agregada con éxito ',
    });

    this.cdr.detectChanges();
  }

  async updateSpecialty(id: string, fields: { [key: string]: any }) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.specialtyService.updatespeciality(id, fields, this.listParams.reduce((acc: any, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      return;
    }

    this.specialties = this.specialties.map((s) =>
      `${s.id}` === id ? result.value : s
    );

    this.dialogService.ShowSuccess({
      description: 'Especialidad actualizada con éxito',
    });

    this.cdr.detectChanges();

  }

  async removeSpecialty(id: string) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.specialtyService.deletespeciality(id);

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.error = result.error;
      this.dialogService.showError({ description: result.error });
      // return;
    }

    this.specialties = this.specialties.filter((s) => `${s.id}` !== id);

    this.dialogService.ShowSuccess({
      description: 'Especialidad eliminada con éxito',
    });

    this.cdr.detectChanges();

  }
}
