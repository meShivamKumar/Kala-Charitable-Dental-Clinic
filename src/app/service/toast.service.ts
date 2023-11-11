import { Injectable } from '@angular/core';
import { SelectValueAccessor, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( private toast:ToastController) { }

async show(msg?:string){
 const tos=await this.toast.create({
    message:msg?msg:"Success",
    duration:2000,
    color: "success"
    
  })
  await tos.present();

}
async simple(msg?:string){
  const tos=await this.toast.create({
     message:msg?msg:"Success",
     duration:2000,
     
     
   })
   await tos.present();
 
 }

 async danger(msg?:string){
  const tos=await this.toast.create({
     message:msg?msg:"Success",
     duration:2000,
     color: "danger"
     
   })
   await tos.present();
 
 }
 async warn(msg?:string){
  const tos=await this.toast.create({
     message:msg?msg:"Success",
     duration:2000,
     color: "warning"
     
   })
   await tos.present();
 
 }

}
