import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

import {PATHS} from '../globals';
import { stringify } from 'querystring';
import { ReactiveFormsModule } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
/**
* for diverse explanations : https://www.youtube.com/watch?v=I18jDMPHEjU&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=20 
*/
export class AuthService {
  loginApiPoint:string = PATHS.API_ENDPOINT+"login" ;
  verifyApiPoint:string = PATHS.API_ENDPOINT+"verifyLogged" ;
  getUserIdApiPoint:string = PATHS.API_ENDPOINT+"getLoggedUserId" ;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + this.getToken()
    }),
    responseType:'text' as 'json'
  };
  
  constructor(private http: HttpClient) { }
  
  /**
  * Login the user by passing a JSON with `email:String` and `password:String` fields to the API.
  * If they match with an account, a JSON Web Token is returned in a JSON this way : `res.token`. 
  * The token can be sent to LocalStorage with `localStorage.setItem('token', res.token);`.
  * @param user a JSON corresponding to `{email:String, password:String}`.
  * @return an Observable with an attribut 'token' containing the JWT if the credentials where correct.
  */
  loginUser(user) {
    return this.http.post<any>(this.loginApiPoint, user) ; 
  }
  
  /**
  * Verify locally if the client is logged. 
  * @return true if a LocalStorage value named 'token' exists. False not.
  */
  loggedIn(): boolean {
    return !! localStorage.getItem('token'); 
  }
  
  /**
  * Simply log out the client by removing localy the key 'token' in LocalStorage.
  */
  logOutUser() {
    localStorage.removeItem('token'); 
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
  
  /**
  * Similar to {@link AuthService.verifyLoggedIn()}. 
  * @return the id of the user loged. Return a 401 if the client isn't loged.
  */
  getLoggedUserId() { 
    return this.http.get<any>(this.getUserIdApiPoint, this.httpOptions) 
  }
  
  /**
  * @return the encrypted JWT.
  */
  getToken() { return localStorage.getItem('token'); }
  /**
  * @return the HttpHeaders with the Authorization header. 
  */
  getHttpOptions() { return this.httpOptions }
}
