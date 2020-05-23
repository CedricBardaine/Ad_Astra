import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  theEmail:String;
  thePassword:String;

  constructor() { }

  ngOnInit() {
  }

  loginUser() {
    console.log(this.theEmail + " "+ this.thePassword);
  }

}
