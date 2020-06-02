import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {PATHS} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginApiPoint:string = PATHS.API_ENDPOINT+"login" ;

  constructor(private http: HttpClient) { }

  loginUser(user) {
    return this.http.post<any>(this.loginApiPoint, user) ; 
  }

  loggedIn(): boolean {
    return !! localStorage.getItem('token'); 
  }

  getToken() { return localStorage.getItem('token'); }
}
