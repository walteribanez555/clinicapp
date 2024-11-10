import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PatientRoutingModule } from './patient-routing.module';

@NgModule({
  imports: [PatientRoutingModule],
})
export class PatientModule {}
