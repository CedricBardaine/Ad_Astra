import { Component, OnInit } from '@angular/core';

enum FORMSTATE {
  question_1 = 1,
  question_1_refus = -1,
  question_2 = 2,
  question_2_refus = -2,
  question_3 = 3,
  question_3_refus = -3,
  question_4 = 4,
  question_4_refus = -4,
  question_5 = 5,
  question_6 = 6,
  question_7 = 7,
  question_8 = 8
}

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  debugLabel = "" ; // FIXME: delete before prod
  theFormState: FORMSTATE = FORMSTATE.question_1 ; 
  
  
  constructor() {
    this.theFormState = FORMSTATE.question_1;
  }
  
  ngOnInit() {
    this.theFormState = FORMSTATE.question_1;
  }
  
  
}
