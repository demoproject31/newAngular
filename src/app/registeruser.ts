import { LoginComponent } from "./login/login.component";
import { EmailValidator } from "@angular/forms";

export class Registeruser {

    username:String;
    mobilenumber : Number;
    password : String;
    email:EmailValidator;
    constructor(username:String,mobilenumber : Number,password : String ,email:EmailValidator){
        this.username=username;
        this.mobilenumber=mobilenumber;
        this.password=password;
        this.email=email;
    }
    
    setusername (musername:String){
        this.username=musername;
    }
    setmobilenumber (mmobilenumber:Number){
        this.mobilenumber=mmobilenumber;
    }
    setpassword (mpassword:String){
        this.password=mpassword;
    }
    setemail (memail:EmailValidator){
        this.email=memail;
    }
}
