import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentPageRoutingModule } from './treatment-routing.module';

import { TreatmentPage } from './treatment.page';
import { AddComponent } from './add/add.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreatmentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TreatmentPage, AddComponent]
})
export class TreatmentPageModule {}
