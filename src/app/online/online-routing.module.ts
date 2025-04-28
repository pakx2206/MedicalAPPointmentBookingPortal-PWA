import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineAppointmentComponent } from './online-appointment/online-appointment.component';

const routes: Routes = [
  { path: '', component: OnlineAppointmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineRoutingModule {}
