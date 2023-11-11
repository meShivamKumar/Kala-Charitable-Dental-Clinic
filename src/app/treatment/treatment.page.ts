import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { DatabaseService } from '../service/database.service';
import { HttpService } from '../service/http.service';
import { LoadingService } from '../service/loading.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
})
export class TreatmentPage implements OnInit {
id:string;
patient:any={};
treatment:any;
values:any;
form:UntypedFormGroup;
form1:UntypedFormGroup;
work:any;
date:any;
tA:any;
pA:any;
visit:any[];
flag:boolean;
treatmentValues:any;
totalPaid:number=0;
blankArray:any[];
public list=[{name:"OPD CARD"},{name:"RCT"},{name:"FILLING"},{name:"SINGLE SITTING RCT"},
{name:"COMPOSITE FILLING"},{name:"GIC FILLING"},{name:"TEMPORARY FILLING"},{name:"RCT FOLLOW UP"},
{name:"CAPPING"},{name:"METAL CAPPING"},{name:"PFM CAPPING"},{name:"ZIRLONIA CAPPING"},{name:"ACRYLIC CAPPING"},
{name:"BRIDGE"},{name:"EXTRACTION"},{name:"SURGICAL EXTRACTION"},{name:"IMPACTION"},{name:"ORTHO SITTING"},
{name:"SURGICAL FOLLOW UP"},{name:"SCALING"},{name:"BLEACHING"},{name:"DRESSING"},{name:"MEDICATION"},
{name:"GEN FOLLOW UP"},{name:"SURGERY"},{name:"PHYSIOTHERAPY"},{name:"PHYSIOTHERAPY FOLLOW UP"},
{name:"HOMEOPATHY MEDICATION"}];
  constructor(private http:HttpService,private modalcontrol:ModalController,private toast:ToastService,
    private loading:LoadingService, private alert:AlertController, private formBuilder:UntypedFormBuilder,private databaseService:DatabaseService) { }

  ngOnInit() {
    this.totalPaid=0;
    this.flag=false;
    this.visit=[];
  this.form=this.formBuilder.group({
    id:[this.id,Validators.required]
  //  date:[],
  //  totalAmount:[],
  //  paidAmount:[]
  })
  this.form1=this.formBuilder.group({
    date:['',Validators.required],
    totalAmount:['',Validators.required],
     paidAmount:['',Validators.required],
     workDone:['',Validators.required],
     visit:[],
     totalPaid:[],

  })
   this.treatment=[];
   this.values=[];
  this.patient={};
  this.treatmentValues=[];
  this.form=this.formBuilder.group({
    
    
  })
  }
  blank(){
    this.form1.controls["date"].setValue("");
    this.form1.controls["totalAmount"].setValue("");
    this.form1.controls["paidAmount"].setValue("");
    this.form1.controls["workDone"].setValue("");
    this.form1.controls["visit"].setValue("");
  }

  getid(value:any){
    this.id=value;
    this.values=[]
    console.log(this.id);
    this.getPatients();
    
  }
  getPatients(){
    this.databaseService.getSinglePatients(String(this.id)).then((tmp:any)=>{
      if(tmp[this.id]){
      console.log(tmp);
      this.patient=tmp[this.id];
      console.log(this.patient);
      this.getTreatment();}
      else{
        this.toast.danger("No data found");
      }
    })
    // this.http.getRequest("http://localhost:3000/patient/"+this.id).then((response:any)=>{
    //   this.patient=response;
      
    // }).catch((err:string)=>{
    //   console.log(err);
      
    // });
  }

getTreatment(){
  this.values=[];
  this.databaseService.getTreatments().then((tmp:any)=>{
    console.log(tmp);
    if(tmp.length!=0){
    this.treatmentValues=tmp[this.id].treatment;
    this.treatment=tmp[this.id];
    this.treatmentValues.forEach((k)=>{
      this.values.push(k)
    })
    this.flag=true;
  }
  })
  // this.http.getRequest("http://localhost:3000/treatments/"+this.id).then((response:any)=>{
  //   if(response.length!=0){
  //     this.treatmentValues=response.treatment;
  //   this.treatment=response;
  //   response.treatment.forEach((k)=>{
  //     this.values.push(k)
  //   })
    
  //   console.log(this.treatment);

  //   console.log(this.values);
  // this.flag=true;}
  // }).catch((err:string)=>{
  //   console.log(err);
    
  // });
}

delete(i:number){
  console.log(i);
  this.values.splice(i,1);
  console.log(this.values)
  // let newFirstElement = this.form1.value

  // let newArray = [newFirstElement].concat(this.values)
  //  this.values.push(this.form1.value);
  //  console.log(newArray);
//  this.form.value["id"]=this.id;
   this.form.value["treatment"]=this.values;
   console.log(this.form.value);
   this.databaseService.setTreatments(String(this.id),this.form.value).then(()=>{
    this.getPatients();
    // this.getTreatment();
    this.toast.danger("Deleted!");
    this.values=[];
   })
  //  this.http.putRequest("http://localhost:3000/treatments/"+this.id,this.form.value).then((response:any)=>{
  //   this.getPatients();
  //   this.getTreatment();
  //   this.toast.danger("Deleted!!");
  //   this.values=[]
 
  // }).catch((err:string)=>{
  //   console.log(err);
    
  // });
}

 addTreatment(){
 if(this.flag){
  // this.form1.controls["visit"].setValue(this.blankArray);
  this.totalPaid=this.form1.value["paidAmount"]
  this.form1.controls["totalPaid"].setValue(this.totalPaid);
  let newFirstElement = this.form1.value

  let newArray = [newFirstElement].concat(this.values)
  //  this.values.push(this.form1.value);
   console.log(newArray);

//  this.form.value["id"]=this.id;
   this.form.value["treatment"]=newArray;
   console.log(this.form.value);
   this.databaseService.setTreatments(String(this.id),this.form.value).then(()=>{
    this.values=[]; 
    this.getTreatment();
     this.blank();
     this.toast.show("Added Successfully");
   })
  //  this.http.putRequest("http://localhost:3000/treatments/"+this.id,this.form.value).then((response:any)=>{
  //   this.values=[]; 
  //  this.getTreatment();
  //   this.blank();
  //   this.toast.show("Added Successfully");
 
  // }).catch((err:string)=>{
  //   console.log(err);
    
  // });
}
  else{
    // this.form1.controls["visit"].setValue(this.blankArray);
    this.totalPaid=this.form1.value["paidAmount"]
  this.form1.controls["totalPaid"].setValue(this.totalPaid);
    this.values.push(this.form1.value);
  this.form.value["id"]=this.id;
  this.form.value["treatment"]=this.values;
  console.log(this.form.value);
  this.databaseService.setTreatments(String(this.id),this.form.value).then(()=>{
    this.values=[]; 
    this.getTreatment();
    // this.ngOnInit();
   this.toast.show("Added Successfully");
   })
//   this.http.postRequest("http://localhost:3000/treatments",this.form.value).then((response:any)=>{
//     this.values=[]; 
//   this.ngOnInit();
//    this.toast.show("Added Successfully");

//  }).catch((err:string)=>{
//    console.log(err);
   
//  });

  }
 } 

addVisit(num:any,index:number,visitV:any[],totalPaid:number){
  if(visitV){
    this.visit=visitV;
  }
  else{this.visit=[];}
  let total=totalPaid+parseInt(num);
  console.log(visitV)
  this.visit.push(num);
  this.values[index].visit=this.visit;
  this.values[index].totalPaid=total;
  this.form.value["treatment"]=this.values;
   console.log(this.form.value);
   this.databaseService.setTreatments(String(this.id),this.form.value).then(()=>{
    this.visit=[] 
   this.getTreatment();
    this.blank();
    this.toast.show("Added Successfully");
 
   })
  //  this.http.putRequest("http://localhost:3000/treatments/"+this.id,this.form.value).then((response:any)=>{
  //  this.visit=[] 
  //  this.getTreatment();
  //   this.blank();
  //   this.toast.show("Added Successfully");
 
  // }).catch((err:string)=>{
  //   console.log(err);
    
  // });
} 
}
