import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  constructor(private http:HttpService,private frombuilder:UntypedFormBuilder,private toast:ToastService, private databaseService:DatabaseService) { }
  form:UntypedFormGroup;
  @Input() modal:any;
  @Input() patient:any;
  @Input() id:string;
  ngOnInit() {
    this.form=this.frombuilder.group({
      id:[this.patient.id,Validators.required],
      name:[this.patient.name,Validators.required],
      address:[this.patient.address],
      contact:[this.patient.contact],
      age:[this.patient.age],
      gender:[this.patient.gender,Validators.required],
      date:[this.patient.date],
      dept:[this.patient.dept]
    })
  }
savePatients(){

this.databaseService.setPatients(String(this.id),this.form.value).then(()=>{
  this.toast.show("Edited Successfully!");
this.modal.dismiss();
});
  // this.http.putRequest("http://localhost:3000/patient/"+this.id,this.form.value).then((response:any)=>{
  //     console.log(response);
  //     this.toast.show("Edited Successfully!");
  //     this.modal.dismiss();})
    
   
  //  .catch((err:HttpErrorResponse)=>{
  //    console.log(err);
  //  })
}


dismissModal(){
  this.modal.dismiss();
}
}
