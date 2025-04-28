import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyVisitsComponent } from './my-visits/my-visits.component';

const routes: Routes = [
  { path: '', component: MyVisitsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitsRoutingModule {}
