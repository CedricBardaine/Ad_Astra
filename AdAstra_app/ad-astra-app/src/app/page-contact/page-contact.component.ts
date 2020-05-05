import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-contact',
  templateUrl: './page-contact.component.html',
  styleUrls: ['./page-contact.component.scss']
})
export class PageContactComponent implements OnInit {

  name:String = null;
  subject:String = null;
  /**
   * isPro ? is a pro : is an artiste
   */
  isPro:boolean = null; 
  message:String = null;

  constructor() { }

  ngOnInit() {
  }

  /**
   * @version 1.0 change this.isPro according to the parameter.
   * @deprecated directly change value in html.
   */
  setPro(isPro:boolean) {
    isPro ? this.isPro = true : this.isPro = false ; 
  }



}
