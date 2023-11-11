import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
loggedIn:boolean=false;
  constructor() { }

  setStatus(status:boolean){
    this.loggedIn=status;
  }

  getStatus(){
    return this.loggedIn;
  }

}
