import { Component, OnInit } from '@angular/core';
import{Allpostlist} from '../modelclass/allpostlist';
import {Postdetails} from '../modelclass/postdetails'
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Requestmodel } from '../shared/requestmodel';
import { RegisterResponse } from '../register-response';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isActive : boolean = true;
  userid : string;
  allpostlist = new Allpostlist();
  public lists = [];

  
  postlist = new Postdetails();
  

  constructor(private _service : RegistrationService,private _router:Router) { 
    // var imag = new Array();
    this.getallpost();
  }

  ngOnInit(): void {

    this.isActive=true;
    
    var userid = localStorage.getItem('userid');
    this.userid=userid
    if(userid==null){
      this._router.navigate(['/Auth']) 
    }
   
  }


  deletepost(list:Postdetails){
    var userid = localStorage.getItem('userid');
    var deletemode = new Requestmodel();
    deletemode.userid=userid;
    deletemode.toid=list.postid;

    this._service.deletePost(deletemode).subscribe((data : RegisterResponse)=>{
      if(data.status=='1'){
        this.getallpost();
        console.log("comein");
      }

    },error=>{
      console.log(error);
    })
    


  }


getallpost(){
  var userid = localStorage.getItem('userid');
  const formdata = new FormData();
formdata.append('userid',userid)
  this._service.getallposts(formdata).subscribe((data : Postdetails)=>{
    this.postlist=data;
    console.log(this.postlist);
  },error=>{
console.log(error);
  });
}


  //method to know the way of convert the bytes to base64
  readurl(data : any) : any{

    var base64 = data.picBytes;
    var retrivedimage = 'data:image/jpeg;base64,'+base64;
    var reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload=(_event)=>{
     return reader.result;
    }
  }


}
