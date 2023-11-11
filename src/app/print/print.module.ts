import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintPageRoutingModule } from './print-routing.module';

import { PrintPage } from './print.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintPageRoutingModule
  ],
  declarations: [PrintPage]
})
export class PrintPageModule {}
