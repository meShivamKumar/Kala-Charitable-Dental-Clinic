import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatabaseService } from '../service/database.service';
import { HttpService } from '../service/http.service';
import { LoadingService } from '../service/loading.service';
import { ToastService } from '../service/toast.service';
import { PrintComponent } from './print/print.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {

  constructor(private http:HttpService,private modalcontrol:ModalController,private toast:ToastService,
    private loading:LoadingService, private alert:AlertController,private databaseService:DatabaseService) { }
    modal:any;
id:string;
treatment:any;
singlePatient:any;
printData:any;
  ngOnInit() {
    this.treatment=[];
    this.singlePatient={};
    this.printData=[];
  }

  getid(value:any){
    this.printData=[];
    this.id=value;
    console.log(this.id);
    this.getPatient();
    // this.getTreatment();
  }
  ionViewWillEnter(){
    this.printData=[];
  }

  getTreatment(){
this.databaseService.getSingleTreatments(String(this.id)).then((tmp:any)=>{
  this.treatment=tmp[this.id].treatment;
})
    // this.http.getRequest("http://localhost:3000/treatments/"+this.id).then((response:any)=>{
    //   if(response.length!=0){
    //   this.treatment=response.treatment;
     
    //   console.log(this.treatment);
    
    //   }
    // }).catch((err:string)=>{
    //   console.log(err);
      
    // });
  }
  printComponent(cmpName) {
   
    const printContent = document.getElementById(cmpName);
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.outerHTML);
    // WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
      
}
async print(){
this.modal = await this.modalcontrol.create({
  component: PrintComponent,
  backdropDismiss: true,
  componentProps: {
    modal: this.modal,
    patient:this.singlePatient,
    treatment:this.printData,
  },
});

this.modal.onDidDismiss().then((response: any) => {
  
});

return await this.modal.present();
}
add(data:any){
  this.printData.push(data);
  console.log(this.printData)
  
}
  getPatient(){
this.databaseService.getSinglePatients(String(this.id)).then((tmp:any)=>{
  if(tmp[this.id]){
  console.log(tmp);
  this.singlePatient=tmp[this.id];
  this.getTreatment();}
  else{
    this.toast.danger("No Data Found");
  }
})
  //   this.http.getRequest("http://localhost:3000/patient/"+this.id).then((response:any)=>{
    
  //   this.singlePatient=response;
  
    
  // }).catch((err:string)=>{
  //   console.log(err);
  //   this.toast.warn("NO DATA FOUND");
    
  // });
}
 


  

}
