import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {
isVisible:boolean;
  constructor(private loading:LoadingController) { }

async show(msg?:string){
 const load= await this.loading.create({
    message: msg?msg:"Loading..",
    duration:3000,
  })
  this.isVisible=true;
 await load.present();

}

async hide(){
  if(this.isVisible){
    await this.loading.dismiss();
  }
}

}
