import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError, from } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { retry, catchError, map } from 'rxjs/operators';
import { Registeruser } from './registeruser';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  public username: String;
  public password: String;


  constructor(private _http : HttpClient) {
   }
   handlerError(error :HttpErrorResponse){
     let errormessage = 'unknown error !';
      if(error.error instanceof ErrorEvent){
        //Client side errror 
        errormessage ='Error : ${error.error.message}';
      }else{
        //servise side error
        let codemesg = error.status;
        let mesageeroor=error.message;
        errormessage ='Error Code :'+ codemesg +'\n message '+mesageeroor;
      }
      window.alert(errormessage);
      return throwError(errormessage);
   }

   options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }



  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }



  public loginUserFromRemote(user :User):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/login",user).pipe(catchError(this.handlerError));
  }

  public postanewfile(registeruser :FormData):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/newpost",registeruser).pipe(catchError(this.handlerError));
  }

  public getallposts(userid : FormData):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/getallpost",userid).pipe(catchError(this.handlerError));
  }

  public checkuser(userid : FormData) : Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/checkuser",userid).pipe(catchError(this.handlerError));
  }

  public getprofiledetails(userid :FormData):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/getprofiledetails",userid).pipe(catchError(this.handlerError));
  }

  public getallusers(userid :FormData):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/getallusers",userid).pipe(catchError(this.handlerError));
  }

  public setprofileimage(userid :FormData):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/uploadprofileimg",userid).pipe(catchError(this.handlerError));
  }

  public sendfriends(userid :FormData):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/sendfriend",userid).pipe(catchError(this.handlerError));
  }


  public sendrequest(userid :any):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/sendrequest",userid).pipe(catchError(this.handlerError));
  }

  public requestedfriend(userid :any):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/requestedfriend",userid).pipe(catchError(this.handlerError));
  }
  public deletRequest(userid :any):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/deleterequest",userid).pipe(catchError(this.handlerError));
  }

  public acceptFriends(userid :any):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/acceptfriends",userid).pipe(catchError(this.handlerError));
  }

  public deletePost(userid :any):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/deletePost",userid).pipe(catchError(this.handlerError));
  }

  public adminpanal(userid :any,username : String ,password : String ):Observable<any>{
    return this._http.get<any>("http://localhost:9090/admin/demo",{headers : {authorization :this.createBasicAuthToken(username,password)}}).pipe(catchError(this.handlerError));
  }

  public changeusername(userid :any):Observable<any>{
    return this._http.post<any>("http://localhost:9090/normal/changeusername",userid).pipe(catchError(this.handlerError));
  }


}
