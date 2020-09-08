import { Injectable, NgZone } from '@angular/core';
import{Googleuser}from './googleuser'
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { RegisterResponse } from '../register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  userreq = new User();
  register_response : RegisterResponse;
  userid : String;

  constructor(public _router : Router,public afAuth : AngularFireAuth, public ngZone: NgZone,
    private _service : RegistrationService) { 
    this.afAuth.authState.subscribe(user => {
     
  })
    }
    
    OAuthProvider(provider) {
      var base=this;
      return this.afAuth.signInWithPopup(provider)
          .then((res) => {
              this.ngZone.run(() => {

                firebase.auth().currentUser.getIdToken(true).then(function(token){
                  console.log("firebasetoken  " +token)
                  base.userreq.token=token;
                  base.loginUser();
                 
                }).catch(function(error){
                  console.log("tokenerror  "+error)
                })
                // base._router.navigate(['/home'])
              })
          }).catch((error) => {
              window.alert(error)
          })
  }


  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }  

  // Firebase Google Sign-in
  SigninWithGoogle() {
      return this.OAuthProvider(new auth.GoogleAuthProvider())
          .then(res => {
              console.log('Successfully logged in!')
          }).catch(error => {
              console.log(error)
          });
  }
  
  AuthLogin(provider) {
    var base=this;
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      firebase.auth().currentUser.getIdToken(true).then(function(token){
        console.log("firebasetoken  " +token)
        base.userreq.token=token;
        base.loginUser();
       
      }).catch(function(error){
        console.log("tokenerror  "+error)
      })
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }


  loginUser(){
    var base = this;
    console.log("come in api  --"+base.userreq.token);
    // alert("come in api  --"+JSON.stringify(base.user));
    base._service.loginUserFromRemote(base.userreq).subscribe(
      (data : RegisterResponse) =>{base.register_response ={
        status : data["status"],
        userid :data["userid"],
        message :data["message"]
      },console.log("after resevied"+base.userreq.token);
      base.userid = base.register_response.userid;
      if(base.register_response.status=="1"){
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
      // base.msg = "bad creadientials please enter the valid data.."
    }
    );
   

  }



}
