import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private req:HttpClient) { }

getRequest(url:string){
  let promise=new Promise((resolve,reject)=>{
    this.req.get<any>(url).subscribe((response:any)=>{
      resolve(response);}
    ,(err:string)=>{
      reject(err);

    })
  })
  return promise;
}

postRequest(url:string,data:any){
  let promise=new Promise((resolve,reject)=>{
    this.req.post<any>(url,data).subscribe((response:any)=>{
      resolve(response);}
    ,(err:string)=>{
      reject(err);

    })
  })
  return promise;
}
  

putRequest(url:string,data:any){
  let promise=new Promise((resolve,reject)=>{
    this.req.put<any>(url,data).subscribe((response:any)=>{
      resolve(response);}
    ,(err:string)=>{
      reject(err);

    })
  })
  return promise;
}

deleteRequest(url:string){
  let promise=new Promise((resolve,reject)=>{
    this.req.delete<any>(url).subscribe((response:any)=>{
      resolve(response);}
    ,(err:string)=>{
      reject(err);

    })
  })
  return promise;
}



}
