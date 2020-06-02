import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  theEmail:String;
  thePassword:String;
  
  
  
  constructor(private _auth: AuthService, private _router: Router) { }
  
  ngOnInit() {
  }
  
  loginUser() {
    let loginingUser = {
      email: this.theEmail,
      password: this.thePassword
    }
    console.log(this.theEmail + " "+ this.thePassword);
    console.log(loginingUser);
    
    this._auth.loginUser(loginingUser)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/artist']) ; 
      },
      err => console.log(err)
      )
    }
    
  }
