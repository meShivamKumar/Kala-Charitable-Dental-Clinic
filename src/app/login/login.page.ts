import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { LoadingService } from '../service/loading.service';
import { LoginService } from '../service/login.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
data:any={};
msg:string="";
loggedIn:boolean;
temp:any;
  constructor(private formBuilder:UntypedFormBuilder, private route:Router, private loginService:LoginService,private databaseService:DatabaseService,
     private load:LoadingService, private toast: ToastService) { }
form=this.formBuilder.group({
  username:['',Validators.required],
  password:['',Validators.required]
})
  ngOnInit() {
    this.msg="";
  
  }
async login(){
  await this.load.show("Logging In..")
this.data=this.form.value;
this.temp=this.form.value;

if(this.data.password==="nishant" && this.data.username==="nishant" )
{ this.loggedIn=true;
  if(this.loggedIn){
  this.loginService.setStatus(true);
this.route.navigateByUrl("/main");
await this.toast.show("Logged In Successfully");
await this.databaseService.init();
await this.load.hide();}
}
else
{this.msg="Invalid Username/Password";
await this.load.hide();
}




}
afterLoggedIn(){
  if(this.loggedIn){
    this.loginService.setStatus(true);
  this.route.navigateByUrl("/main");}
}
}
