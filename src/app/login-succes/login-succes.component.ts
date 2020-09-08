import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';




@Component({
  selector: 'app-login-succes',
  templateUrl: './login-succes.component.html',
  styleUrls: ['./login-succes.component.css']
  
})




export class LoginSuccesComponent implements OnInit {
  brokerclick : boolean;
  individualclick : boolean;
  titletext : String;


  constructor(private _router:Router) {
  
   
   }

  ngOnInit(): void {

    // var userid = localStorage.getItem('userid');
    // if(userid!=null){
    //   this._router.navigate(['/home']) 
    // }

  }


  brokersonclick(){
this.titletext="Brokers Login"
this.brokerclick=true;
this.individualclick=false;
  }

  individualsonclick(){
    this.titletext="Individual Login"
    this.individualclick=true;
    this.brokerclick=false;
  }

}
