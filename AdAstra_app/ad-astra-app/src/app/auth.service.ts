import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

import {PATHS} from '../globals';
import { stringify } from 'querystring';
import { ReactiveFormsModule } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginApiPoint:string = PATHS.API_ENDPOINT+"login" ;
  verifyApiPoint:string = PATHS.API_ENDPOINT+"verifyLogged" ;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + this.getToken()
    }),
    responseType:'text' as 'json'
  };
  
  constructor(private http: HttpClient) { }
  
  loginUser(user) {
    return this.http.post<any>(this.loginApiPoint, user) ; 
  }
  
  loggedIn(): boolean {
    return !! localStorage.getItem('token'); 
  }
  
  /**
   * Calling a fct in the API,
   * if the Client as a correct token (is correctly logged in),
   * .subscribe() will allow to add traitments in the (res) => {}
   */
  verifyLoggedIn() {
    return this.http.post<any>(this.verifyApiPoint, null, this.httpOptions)
    // .subscribe(
    //   (res) => { console.log(res); return true},
    //   err => { console.log("Error! : ", err); return false},
    //   () => { console.log("The POST observable is now completed."); return false}
    //   )
    }
    
    getToken() { return localStorage.getItem('token'); }
  }
