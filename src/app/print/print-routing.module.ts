import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintPage } from './print.page';

const routes: Routes = [
  {
    path: '',
    component: PrintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintPageRoutingModule {}
