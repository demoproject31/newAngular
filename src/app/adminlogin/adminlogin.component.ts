import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { RegisterResponse } from '../register-response';
import {Allusers} from '../modelclass/allusers'
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  usernamevalid : boolean;
  passwordvalid:boolean;
musername : string;
mpassword:string;

loginsuccesfully:boolean;
beforelogin:boolean;

allusers = new Allusers();


  constructor(private _service : RegistrationService,private _router:Router) { 
this.usernamevalid=false;
this.passwordvalid=false
this.loginsuccesfully=false;
this.beforelogin=true
  }

  ngOnInit(): void {

    localStorage.setItem("userid",null);
  }

  login(){

    

    if(this.musername==null){

      this.usernamevalid=true;
      this.passwordvalid=false;

    }else if(this.mpassword==null) {
      this.usernamevalid=false;
      this.passwordvalid=true;

    }else{
// alert(this.musername +this.mpassword)

    this._service.adminpanal("01",this.musername,this.mpassword).subscribe((data:Allusers)=>{
      this.allusers=data;
      this.loginsuccesfully=true;
      this.beforelogin=false;
      localStorage.setItem("userid",null);
      console.log(this.allusers)
    },error=>{
      console.log(error)
    })
  }
}

}
