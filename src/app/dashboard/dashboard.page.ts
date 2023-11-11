import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddComponent } from '../patient/add/add.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
modal:any;
  constructor(private modalcontrol:ModalController) { }

  ngOnInit() {
  }
  async addPatient() {
    this.modal = await this.modalcontrol.create({
      component: AddComponent,
      backdropDismiss: false,
      componentProps: {
        modal: this.modal,
      },
    });
  
    this.modal.onDidDismiss().then((response: any) => {
      
    });
  
    return await this.modal.present();
  }

  addTreatment(){}
  
  }
  


