import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { UserRoutingModule } from './user-routing.module';
@NgModule({
  imports: [UserRoutingModule],
})
export class UserModule {}
