import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../service/database.service';
import { LoadingService } from '../service/loading.service';
import { LoginService } from '../service/login.service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
// appPages:any[]=[];
  constructor(private alert:AlertController,
    private loading:LoadingService,private databaseService:DatabaseService,private toast:ToastService,private router:Router,
    private loginService:LoginService) { }
  public appPages = [
    { title: "Dashboard", url: "/main/dashboard", icon: "aperture"},
    { title: "Patients", url: "/main/patient", icon: "people" },
    { title: "Treatment", url: "/main/treatment", icon: "bag-add" },
    { title: "Billing", url: "/main/billing", icon: "card" },
    { title: "Summary", url: "/main/summary", icon: "sunny" },
    { title: "Print", url: "/main/print", icon: "print" },
   
  ];
  ngOnInit() {
  // this.appPages = [
  //     { title: 'Exams', url: '/exams', icon: 'document' },
  //     { title: 'Accounts', url: '/accounts', icon: 'people' },
  //     { title: 'Settings', url: '/settings', icon: 'settings' },
  //     { title: 'Users', url: '/users', icon: 'people' },
  //   ];
  }

  async reset(){
    const alert = await this.alert.create({
      header: "Reset Application?",
      message: "Are you sure? Your whole data will be deleted!!",
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
          text: "Reset",
          cssClass: "danger",
          handler: async() => {
            console.log("Confirmed");
           await this.loading.show("Resetting ");
        this.databaseService.clear();
        this.toast.show("Reset Successfull!");
        this.loading.hide();
   },
  },
  ],
  });
        
  await alert.present();
  }


  async logout(){
    const alert = await this.alert.create({
      header: "Logout?",
      message: "Are you sure? ",
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
          text: "Logout",
          cssClass: "primary",
          handler: async() => {
            console.log("Confirmed");
           await this.loading.show("Logging Out ");
           this.loginService.setStatus(false);
        this.router.navigateByUrl("/login");

        this.toast.show("log out Successfull!");
        this.loading.hide();
   },
  },
  ],
  });
        
  await alert.present();
  }

}
