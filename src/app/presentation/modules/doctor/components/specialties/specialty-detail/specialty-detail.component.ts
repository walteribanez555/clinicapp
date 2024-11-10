import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Specialty } from '../../../../../../models/specialty.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-specialty-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './specialty-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtyDetailComponent implements OnInit {
  ngOnInit(): void {
    this.specialtyForm = new FormGroup({
      name : new FormControl(this.specialty.name),
      id : new FormControl(this.specialty.id),
    })
  }


  @Input()  specialty! : Specialty
  @Input() detailListener! : DetailListener<Specialty>;


  specialtyForm = new FormGroup({
    name : new FormControl(),
    id :new FormControl(),
  })


  close(){
    this.detailListener.close();
  }

  onSubmit(){
    this.detailListener.submit(this.specialtyForm);
  }

  onDelete() {
    this.detailListener.delete(this.specialty.id);
  }

 }
