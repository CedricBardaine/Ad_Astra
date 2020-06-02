import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {PATHS} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // loginApiPoint = PATHS.API_ENDPOINT+"login";
  loginApiPoint = "http://localhost:5000/login";

  constructor(private http: HttpClient) { }

  loginUser(user) {
    return this.http.post<any>(this.loginApiPoint, user) ; 
  }
}
