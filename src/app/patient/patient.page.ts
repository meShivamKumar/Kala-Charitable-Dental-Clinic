import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Patients } from '../interfaces/patient';
import { DatabaseService } from '../service/database.service';
import { HttpService } from '../service/http.service';
import { LoadingService } from '../service/loading.service';
import { ToastService } from '../service/toast.service';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
patient:{ [key: string]: Patients };
patientArray:any[];
patientArrayList:any[];
modal:any;
id:number;
flag:boolean;
flagp:boolean;
singlePatient:any;
string:string;
  constructor(private http:HttpService,private modalcontrol:ModalController,private toast:ToastService,
    private loading:LoadingService, private alert:AlertController, private databaseService:DatabaseService,
    private fileSaver:FileSaverService) { }

  ngOnInit() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const d = new Date();
console.log("The current month is " + monthNames[d.getMonth()]);
this.string=monthNames[d.getMonth()];
    this.string=null;
    this.patientArray=[];
    this.patientArrayList=[];
    this.patient={};
    this.flag=false;
    this.flagp=true;
    this.singlePatient={};

    this.getPatients();
  }
getPatients(){
  // this.loading.show("Fetching Patients");
  this.databaseService.getPatients().then((tmp:any)=>{
    this.patient=tmp;
    Object.keys(this.patient).forEach((k:any)=>{
      this.patientArray.push(this.patient[k]);
    })
    this.patientArrayList=this.patientArray;
    // this.loading.hide();
  })
  // this.http.getRequest("http://localhost:3000/patient").then((response:any)=>{
  //   this.patient=response;
    
  // }).catch((err:string)=>{
  //   console.log(err);
    
  // });
}
async view(data:any){
  this.modal= await this.modalcontrol.create({
    component:ViewComponent,
    backdropDismiss:true,
    componentProps:{
      modal:this.modal,
      data:data
    }
  })
  this.modal.onDidDismiss().then((response: any) => {
      
  });
  return await this.modal.present();
}
clear(){
  this.flagp=true;
  this.flag=false;
  
}

searchByName(event) {
  let str = event.detail.value;
  this.patientArray = this.patientArrayList.filter((e) =>
    e.name.toLowerCase().includes(str.toLowerCase()),
  );
}
searchById(event) {
  let str = event.detail.value;
  console.log(str);
  
  this.patientArray = this.patientArrayList.filter((e) =>
    String(e.id).toLowerCase().includes(str.toLowerCase()),
  );
}

// getid(value:any){
//   if(value>0){
//     this.flag=true;
//     this.flagp=false;
//   this.id=value;
//   console.log(this.id);
//   this.http.getRequest("http://localhost:3000/patient/"+value).then((response:any)=>{
    
//     this.singlePatient=response;
  
    
//   }).catch((err:string)=>{
//     console.log(err);
//     this.toast.warn("NO DATA FOUND");
    
//   });}
//   else{
//     this.flagp=true;
//     this.flag=false;
//   }
// }


async editPatient(id:string,patient:any){
  this.modal= await this.modalcontrol.create({
    component:EditComponent,
    backdropDismiss:true,
    componentProps:{
      modal:this.modal,
      id:id,
      patient:patient
    }
  })
  this.modal.onDidDismiss().then((response: any) => {
    this.patientArray=[];
    this.patientArrayList=[];
    this.getPatients();
      
  });
  return await this.modal.present();

}
async deletePatient(id:string,name:string){
  const alert = await this.alert.create({
    header: "Delete?",
    message: "Are you sure, you want to delete " + name + "?",
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
        cssClass: "dark",
        handler: () => {
          console.log("Canceled");
        },
      },
      {
        text: "Delete",
        cssClass: "danger",
        handler: async() => {
          console.log("Confirmed");
         await this.loading.show("Deleting " + name);
         this.databaseService.delPatient(id).then(() => {
          this.patientArray=[];
          this.patientArrayList=[];
          this.toast.show("Deleted Successfuly");
          this.getPatients();
          this.loading.hide();
        });
//          this.getPatients();
// this.http.deleteRequest("http://localhost:3000/patient/"+id).then(async(response:any)=>{
//   this.getPatients();
//  await this.loading.hide();
//   this.toast.show("Deleted Successfuly");
// }).catch((err:HttpErrorResponse)=>{
//   console.log(err);
//   this.loading.hide();
// }); 
 },
},
],
});
      
await alert.present();
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
    this.patientArray=[];
    this.patientArrayList=[];
    this.getPatients();
  });

  return await this.modal.present();
}

excelExport(){
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';

const worksheet=XLSX.utils.json_to_sheet(this.patientArray);
const workbook={
  Sheets:{
      "Patients":worksheet
  },
  SheetNames:[this.string]
}
const excelBuffer=XLSX.write(workbook,{bookType:'xlsx',type:'array'});

const blobData=new Blob([excelBuffer],{type:EXCEL_TYPE});
this.fileSaver.save(blobData,this.string+" Patients Data",)
}

}
