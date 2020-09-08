import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { RegisterResponse } from '../register-response';
// import {WindowService} from '../window.service';
import * as firebase from 'firebase';
// import * as firebase from 'firebase/app';

import {WindowsserviceService} from '../windowsservice.service'
import { environment } from 'src/environments/environment';
import {AuthService} from 'src/app/shared/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})




export class LoginComponent implements OnInit {

  WindowRef : any;
  User : any ;
  submitbutton :boolean;
  captcahaerror : String;
  userid : String;
  register_response : RegisterResponse;
  otpcode : String;
  numbertext :boolean;
  verifytext : boolean;
  username : any;
  visible:string;

 

task : Task={
 name:'Remember me ?',
  completed :false,
  // color : 'primary'
}



 user = new User();
  msg = '';
  constructor(private _service : RegistrationService,private _router:Router,
    private win : WindowsserviceService,public authserivce : AuthService) {

    //   this.afauth.authState.subscribe(user => {
       
    // })

    this.numbertext =true;
    this.verifytext=false;
    this.visible='visible'
  }
  ngOnInit(): void {
    var userid = localStorage.getItem('userid');
    this.userid=userid
    // if(userid!=null){
    //   this._router.navigate(['/home']) 
    // }


    firebase.initializeApp(environment.firebase)
    this.WindowRef=this.win.windowref;
    // this.WindowRef.recaptchaverifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.WindowRef.recaptchaverifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    console.log(this.WindowRef.recaptchaverifier)
    this.WindowRef.recaptchaverifier.render()
    const appVerifier = this.WindowRef.recaptchaverifier.g;

    this.submitbutton=this.WindowRef.recaptchaverifier.g!=null?false:false;
  }

//   async OAuthProvider(provider: auth.AuthProvider) {
//     try {
//       const res = await this.afauth.auth.signInWithPopup(provider);
//       this.ngzone.run(() => {
//       });
//     }
//     catch (error) {
//       window.alert(error);
//     }
// }


//   async SigninWithGoogle(){
//     try {
//       const res = await this.OAuthProvider(new auth.GoogleAuthProvider());
//       console.log('sucesssfullyloginin');
//     }
//     catch (error) {
//       console.log(error);
//     }
//   }


  captchaverfied(){
    this.numbertext=false;
    this.verifytext=true;
    this.visible='hidden'
    this.sendLoginCode();
  }
   
  sendLoginCode(){
   
    const appVerifier = this.WindowRef.recaptchaverifier;
    // var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const mobi = "+91"+this.user.mobilenumber;
    const num = mobi
    firebase.auth().signInWithPhoneNumber(num,appVerifier)
    .then(result => {
      this.WindowRef.conformationResult = result;
      this.numbertext=false;
      this.numbertext=false;
    })
    .catch(error => {
      console.log(error)
      this.captcahaerror=error}
    );
  
  }

  verifyLoginCode(){
    console.log("otpcode " +this.otpcode) 
    var base =this;
    base.WindowRef.conformationResult.confirm(base.otpcode)
    .then(result => {
      //base.user=result.user;
      console.log("otp verify  " +result.user)
      firebase.auth().currentUser.getIdToken(true).then(function(token){
        console.log("firebasetoken  " +token)
        base.user.token=token;
        base.loginUser();
       
      }).catch(function(error){
        console.log("tokenerror  "+error)
      })
      
    }).catch(error => console.log(error,"Incorrect Code Entered?"))
  }

  // methosd(){
  //   this.loginUser("eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyODA5ZGQyMzlkMjRiZDM3OWMwYWQxOTFmOGIwZWRjZGI5ZDM5MTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vamxjbWF0cmkiLCJhdWQiOiJqbGNtYXRyaSIsImF1dGhfdGltZSI6MTU5ODM0OTAyMCwidXNlcl9pZCI6IlI4WUNxbzVTbTZPaEFhdWNlbU42d2pzNFE4eDEiLCJzdWIiOiJSOFlDcW81U202T2hBYXVjZW1ONndqczRROHgxIiwiaWF0IjoxNTk4MzQ5MDIxLCJleHAiOjE1OTgzNTI2MjEsInBob25lX251bWJlciI6Iis5MTk5OTQ1OTE0MTIiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis5MTk5OTQ1OTE0MTIiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.RLk-6iwjMLDIw1fTZfEcM2E-2ok1onylq8eaXLtz4eTlrINzhG0WQjQmZhRGtkB0bEQx6ZvzSdEsGUzmpCH97lpwFFEArdvm1r4ULqo5q1lq4KE_PAfz8enxvGHIVkDsSR-xs0q_FUYOmQiSHaX-1RdlGxZM-cfqdSR7QZtU58-o-EamQS2x-f4wt0ogxriL0cYp6ErBQWTtEsPNw1zNSQq4ioZ6Vl4ZxPPqTyP6b1cOLyoA86O0YOng8ICI-9MHdB172Ds0IafeueEkqbQQungD5JpKHRTgyjPBa85qXepuoAxR8Maz-UrBQgTiH_Ubx0gB0XrOhXnTwnpic0KvMA");
  // }
  

  loginUser(){
    var base = this;
    // var mtoken =token;
    console.log("come in api  --"+base.user.token);
    // alert("come in api  --"+JSON.stringify(base.user));
    base._service.loginUserFromRemote(base.user).subscribe(
      (data : RegisterResponse) =>{base.register_response ={
        status : data["status"],
        userid :data["userid"],
        message :data["message"]
      },console.log("after resevied"+base.user.token);
      base.userid = base.register_response.userid;
      if(base.register_response.status=="1"){
        console.log("come in api  --"+base.user.token);
        localStorage.setItem("userid",base.register_response.userid)
        console.log(base.register_response.message)
        console.log(base.register_response.userid)
        base._router.navigate(['/home']) 
      }else{
        console.log(base.register_response.message)
        console.log(base.register_response.userid)
      }
    },
      error => {console.log("error occure api");
      base.msg = "bad creadientials please enter the valid data.."
    }
    );
   

  }

  
  backtonumber(){
    this.numbertext=true;
    this.verifytext=false;
    this.visible='visible'
  }





  gotoregistration(){
    this._router.navigate(['/Auth/registration'])
  }



  
}



export interface Task {
  name: string;
  completed: boolean;
  // color: ThemePalette;
}