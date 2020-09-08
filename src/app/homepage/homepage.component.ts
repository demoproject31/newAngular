import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {Newpost} from '../modelclass/newpost'
import { RegistrationService } from '../registration.service';
import { DateAdapter } from '@angular/material/core';
import {Getprofiledetails} from '../modelclass/getprofiledetails'
import { error } from '@angular/compiler/src/util';
import { IfStmt } from '@angular/compiler';
import { RegisterResponse } from '../register-response';
import {Allusers} from '../modelclass/allusers'
import {Requestmodel} from '../shared/requestmodel'
import {Friendrequestmodel} from '../modelclass/friendrequestmodel'
import { database } from 'firebase';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

isActive=true;
username : String;
itemchange : boolean;
mouseover1:boolean;
mouseover2:boolean;
mouseover3:boolean;
mouseover4:boolean;
mouseover5:boolean;
mouseover6:boolean;
mouseover7:boolean;
newsclick:boolean;
noticlick:boolean;
msgclick : boolean;
mktclick :boolean;
frdclick : boolean;
ctclick : boolean;
stgclick : boolean;
posthight: string;
postimagedis : string;
hidepost :boolean;
postfile:File;
public imagepath ;
imageurl:any;
profileimage : any;
public userfile :any =File;
fndrqtres :RegisterResponse;

editname:boolean;
usenameedited:string;

userid : string;

allusers = new Allusers();
newallusers = new Allusers();
newpost=new Newpost();
getprofile = new Getprofiledetails();
requestmode = new Requestmodel();
friendrequestmodel = new Friendrequestmodel();




  ngOnInit(): void {

    var userid = localStorage.getItem('userid');
    this.userid=userid
    
    if(userid.length<3){
      this._router.navigate(['/Auth'])
    }


    const formdata = new FormData();
    formdata.append('userid',this.userid)
    console.log(this.userid)


    this._service.getprofiledetails(formdata).subscribe((data : Getprofiledetails)=>{
      this.getprofile=data;
      console.log(this.getprofile)
      // if(data.status=='1')
      this.profileimage=this.getprofile.imageurl=='null'?"/assets/profile.jpg":this.getprofile.imageurl;
      this.username=this.getprofile.username=='null'?'username':this.getprofile.username;
   
    },error=>{
      console.log(Error)
    })
   
    // var status = this.getprofile.status
    //   var imgurl =this.getprofile.imageurl
      // if(status=='1'){
      //   console.log(this.username)
      //     if(imgurl=='null'){
      //       this.profileimage="/assets/profile.jpg";
      //     }else{
      //       this.profileimage=this.getprofile.imageurl;
      //       console.log(this.profileimage)
      //     }
      //     this.username=this.getprofile.username=='null'?'username':this.getprofile.username;
      //     console.log(this.username)
      // }

  }



  options: FormGroup;

  constructor(fb: FormBuilder,private _router:Router,private _service : RegistrationService  ) {
  
    // this.username='username'
    this.newsclick=true
    this.noticlick=false
    this.msgclick =false
    this.mktclick=false
    this.frdclick =false
    this.ctclick =false
    this.stgclick =false
    this.hidepost=true
    this.getallusers();
this.getrequestusers();
this.sendfriends();
this.editname=false;

    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });


  

  }

  namechangediv(){
this.editname=true
  }


usercheck (){
  var userid = localStorage.getItem('userid');
  const formdata = new FormData();
  formdata.append('userid',this.userid)
  if(userid==null){
    this._router.navigate(['/Auth']) 
  }else{
    this._service.checkuser(formdata).subscribe((data:RegisterResponse)=>{
        if(data.status=='0'){
          this._router.navigate(['/Auth']) 
          localStorage.setItem('userid',null);
        }
    },error=>{
      console.log(error)
    })
  }
  
}


  onFileChanged(event){
const postfile =event.target.files[0];
this.userfile=postfile
  var reader = new FileReader();
    this.imagepath=this.userfile;
    reader.readAsDataURL(this.userfile);
    reader.onload=(_event)=>{
      this.imageurl = reader.result;
      this.hidepost=false
    }

  }

  getrequestusers(){
    var userid = localStorage.getItem('userid');
var formdata = new FormData();
formdata.append('userid',userid);

  this._service.requestedfriend(formdata).subscribe((data:Friendrequestmodel)=>{
this.friendrequestmodel=data;

  },error=>{
console.log(error)
  })


  }

  postclick(){
    this.postimagedis='block';
    this.posthight='yes';
    this.hidepost=false
  }
  uploadepost(){
    const formdate = new FormData();
    var userid = localStorage.getItem('userid');
    this.newpost.userid=userid
    formdate.append('userid',this.newpost.userid);
    formdate.append('postmessage',this.newpost.postmessage);
    formdate.append('files',this.userfile);
    console.log(this.userfile)
    console.log(userid)
    this._service.postanewfile(formdate).subscribe((data)=>{
        console.log(data)
        this.imageurl=null
        this.hidepost=true
    },error=>{
      console.log(error)
    });
  }


  profileuploade(event){

     const postfile =event.target.files[0];
      //  this.userfile=postfile
       const formdate = new FormData();
        formdate.append("userid",this.userid);
        formdate.append('profileimage',postfile);
       this._service.setprofileimage(formdate).subscribe((data:RegisterResponse)=>{
          if(data.status=='1'){
            this.profileimage=data.userid;
          }

       },error=>{
         console.log(error)
       })
    
  }

  logout(){
    localStorage.setItem("userid",null);
    this._router.navigate(['/Auth']) 
  }



  getallusers(){
    var userid = localStorage.getItem('userid');
    const formdata = new FormData();
    formdata.append('userid',userid)
    // console.log('getallusers----'+this.userid)
    this._service.getallusers(formdata).subscribe((data:Allusers)=>{
      this.allusers=data;
      // this.newallusers=data
      console.log(this,'user response'+this.allusers)
    },error=>{
      console.log(error);
    })
  }

  sendfriends(){
    var userid = localStorage.getItem('userid');
    const formdata = new FormData();
    formdata.append('userid',userid)
    // console.log('getallusers----'+this.userid)
    this._service.sendfriends(formdata).subscribe((data:Allusers)=>{
      // this.allusers=data;
      this.newallusers=data
      console.log(this,'user response'+this.allusers)
    },error=>{
      console.log(error);
    })
  }

  deletrequest(friendrequestmodel:Friendrequestmodel){

    console.log("comein");
    var userid = localStorage.getItem('userid');
    var deletemode = new Requestmodel();
    deletemode.userid=userid;
    deletemode.toid=friendrequestmodel.requestid;
    // alert(friendrequestmodel)
    this._service.deletRequest(deletemode).subscribe((data : RegisterResponse)=>{
      if(data.status=='1'){
        friendrequestmodel.deletedchange=true
        this.getrequestusers();
        // this.sendfriends();
        console.log("comein");
      }

    },error=>{
      console.log(error);
    })

  }

  acceptfriends(friendsmodel : Friendrequestmodel){
    var userid = localStorage.getItem('userid');
    var deletemode = new Requestmodel();
    deletemode.userid=userid;
    deletemode.toid=friendsmodel.requestid;
    deletemode.sendid=friendsmodel.senderid;
    this._service.acceptFriends(deletemode).subscribe((data : RegisterResponse)=>{
      if(data.status=='1'){
        // friendrequestmodel.deletedchange=true
        this.getrequestusers();
        this.getallusers()
        this.sendfriends();
        // this.sendfriends();
        console.log("comein");
      }

    },error=>{
      console.log(error);
    })


  }




  addfriends(users : Allusers){
    var useridee = localStorage.getItem('userid');
    
    console.log(users.userid);
    
    this.requestmode.userid=useridee;
    this.requestmode.toid=users.userid;
    // alert(this.requestmode.toid)
    this._service.sendrequest(this.requestmode).subscribe((data:RegisterResponse)=>{
      this.fndrqtres = data;
      if(data.status=='1'){
      users.sendfriend=true
      this.sendfriends();
    }
    },error=>{
      console.log(error);
    })
   

  }


  changename(){
    var userid = localStorage.getItem('userid');
  var register:RegisterResponse;
    const formdata = new FormData();
    formdata.append('userid',userid)
    formdata.append('changetext',this.usenameedited )
    this._service.changeusername(formdata).subscribe((data:RegisterResponse)=>{

     
      register=data;
      console.log(register)
      if(data.status=="1"){
      this.username=register.userid;
      this.editname=false
      this.usenameedited=null
    }


    },error=>{
      console.log(error)
    })



  }



  mouseenter(a : number){
    switch(a){
      case 1:
        this.mouseover1=true;
      break;
      case 2:this.mouseover2=true;
      break;
      case 3:this.mouseover3=true;
      break;
      case 4:this.mouseover4=true;
      break;
      case 5:this.mouseover5=true;
      break;
      case 6:this.mouseover6=true;
      break;
      case 7:
        this.mouseover7=true;
      break;


    }
// this.itemchange=true;

  }
  mouseleave(a : number){
    switch(a){
      case 1:
        this.mouseover1=false;
      break;
      case 2:this.mouseover2=false;
      break;
      case 3:this.mouseover3=false;
      break;
      case 4:this.mouseover4=false;
      break;
      case 5:this.mouseover5=false;
      break;
      case 6:this.mouseover6=false;
      break;
      case 7:
        this.mouseover7=false;
      break;


    }
    // this.itemchange=false
    // this.mouseover=false
  }

  newsfeedclick(){

    // this.itemchange=true
    // this.mouseover=false
    this.newsclick=true
    this.noticlick=false
    this.msgclick =false
    this.mktclick=false
    this.frdclick =false
    this.ctclick =false
    this.stgclick =false

  }
  notificationclick(){
    // this.itemchange=true
    // this.mouseover=false
    this.newsclick=false
    this.noticlick=true
    this.msgclick =false
    this.mktclick=false
    this.frdclick =false
    this.ctclick =false
    this.stgclick =false

  }
  messageclick(){
    this.newsclick=false
    this.noticlick=false
    this.msgclick =true
    this.mktclick=false
    this.frdclick =false
    this.ctclick =false
    this.stgclick =false
  }

  marketclick(){
    this.newsclick=false
    this.noticlick=false
    this.msgclick =false
    this.mktclick=true
    this.frdclick =false
    this.ctclick =false
    this.stgclick =false

   

  }
  friendclick(){
    this.newsclick=false
    this.noticlick=false
    this.msgclick =false
    this.mktclick=false
    this.frdclick =true
    this.ctclick =false
    this.stgclick =false
  }
  chatclick(){
    this.newsclick=false
    this.noticlick=false
    this.msgclick =false
    this.mktclick=false
    this.frdclick =false
    this.ctclick =true
    this.stgclick =false

  }
  settingclick(){
    this.newsclick=false
    this.noticlick=false
    this.msgclick =false
    this.mktclick=false
    this.frdclick =false
    this.ctclick =false
    this.stgclick =true

  }


}
