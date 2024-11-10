import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Doctor } from '../../../../../../models/doctor.model';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './doctor-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorDetailComponent implements OnInit {
  ngOnInit(): void {

    this.doctorForm.patchValue({
      id : this.doctor.id,
      code : this.doctor.code,
      fullName : this.doctor.user.fullName,
      user_id : this.doctor.user.id,
      email : this.doctor.user.email
    })
  }


  @Input() doctor!: Doctor;
  @Input() detailListener! : DetailListener<Doctor>;


  doctorForm= new FormGroup({
    id : new FormControl(),
    code : new FormControl(),
    fullName : new FormControl(),
    user_id : new FormControl(),
    email : new FormControl(),
  })


  close(){
    this.detailListener.close();
  }

  onSubmit(){
    this.detailListener.submit(this.doctorForm);
  }

  onDelete() {
    this.detailListener.delete(this.doctor.id);
  }
 }
