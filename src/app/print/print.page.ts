import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatabaseService } from '../service/database.service';
import { HttpService } from '../service/http.service';
import { LoadingService } from '../service/loading.service';
import { ToastService } from '../service/toast.service';
import { PrintComponent } from '../summary/print/print.component';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {
id:string;
singlePatient:any;
modalc:any;
constructor(private http:HttpService,private modalcontrol:ModalController,private toast:ToastService,
  private loading:LoadingService, private alert:AlertController,private databaseService:DatabaseService) { }

  ngOnInit() {
  }
  getid(value:any){
    this.id=value;
    console.log(this.id);
    this.getPatient();
    
  }

  getPatient(){
    this.databaseService.getSinglePatients(String(this.id)).then((tmp:any)=>{
      if(tmp){
      console.log(tmp);
      this.singlePatient=tmp[this.id];
      this.modal();}
      else{
        this.toast.danger("No Data Found!");
      }
    })
    }
 

async modal(){
  this.modalc = await this.modalcontrol.create({
    component: PrintComponent,
    backdropDismiss: true,
    componentProps: {
      modal: this.modal,
      patient:this.singlePatient,
      
    },
  });
  
  this.modalc.onDidDismiss().then((response: any) => {
    
  });
  
  return await this.modalc.present();
  }
}

