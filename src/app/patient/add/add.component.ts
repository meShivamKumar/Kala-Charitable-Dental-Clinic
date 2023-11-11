import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  constructor(private http:HttpService,private frombuilder:UntypedFormBuilder,private databaseService:DatabaseService) { }
patients:any[]=[];
form:UntypedFormGroup;
id:number;
treatment:any[]=[];
value:number;
@Input() modal:any;
  ngOnInit() {
    this.getID();
    
    this.form=this.frombuilder.group({
      id:[this.value,Validators.required],
      name:['',Validators.required],
      address:[''],
      contact:[''],
      age:[''],
      gender:['Male',Validators.required],
      date:[],
      dept:[]
    })
    // this.form.value["date"]=new Date().toISOString();
  }


 addPatients(){
  // if (this.form.value["date"]) {
  //   this.form.controls["date"].setValue(
  //     new Date(this.form.controls["date"].value).toISOString()
  //   );}
  
  this.databaseService.setPatients(String(this.value),this.form.value).then(()=>{
    this.setData();
  });
  
 
 }

 setData(){
  let data={
    value:this.value+1
  }
  this.databaseService.setData(String(this.id),data).then(()=>{
    this.modal.dismiss();
  });
 }
   
 getID(){
  this.databaseService.getData().then((tmp:any)=>{
    if(tmp[101]){
      console.log(tmp);
console.log(tmp[101].value);
this.value=tmp[101].value;
this.id=101;
    }
    else{
      this.value=101;
      this.id=101;
      console.log(this.value);
      
    }
  })
  // this.http.getRequest("http://localhost:3000/Data").then((response:any)=>{
   
  //   console.log(this.value);
  //   console.log(this.id);
  // }).catch((err:string)=>{
  //   console.log(err);
    
  // });
}

 dismissModal(){
  this.modal.dismiss();
}
  


}
