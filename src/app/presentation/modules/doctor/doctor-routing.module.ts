import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';
import { DoctorComponent } from './doctor.component';
import { ConsultingRoomComponent } from './pages/consulting-room/consulting-room.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'schedules',
        component: SchedulesComponent,
      },
      {
        path: 'specialties',
        component: SpecialtiesComponent,
      },
      {
        path :'consulting-room',
        component: ConsultingRoomComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
