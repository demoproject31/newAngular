import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowsserviceService {

  constructor() { }
  
  get windowref(){
    return window;
}

}


