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

  label = "" ; 

  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }



  
  theFormState: FORMSTATE = FORMSTATE.question_1 ; 
  
  
  constructor() {
    this.theFormState = FORMSTATE.question_1;
  }
  
  ngOnInit() {
    this.theFormState = FORMSTATE.question_1;
  }
  
  // /**
  //  * 
  //  * @param answ must be a value of the var from the FORMSTATE enum.
  //  */
  // answer(answ:number) {
  //   this.label = "enter fct" ; 

  //   switch (answ) {

      

  //     case FORMSTATE.question_1:
  //     this.theFormState = FORMSTATE.question_1 ;
  //     break;

  //     case FORMSTATE.question_1_refus:
  //     this.theFormState = FORMSTATE.question_1_refus ;
  //     break;

  //     case FORMSTATE.question_2:
        
  //   this.label = "enter q2" ; 
  //     this.theFormState = FORMSTATE.question_2 ;
  //     break;

  //     case FORMSTATE.question_2_refus:
  //     this.theFormState = FORMSTATE.question_2_refus ;
  //     break;

  //     case FORMSTATE.question_3:
  //     this.theFormState = FORMSTATE.question_3 ;
  //     break;

  //     case FORMSTATE.question_3_refus:
  //     this.theFormState = FORMSTATE.question_3_refus ;
  //     break;

  //     case FORMSTATE.question_4:
  //     this.theFormState = FORMSTATE.question_4 ;
  //     break;

  //     case FORMSTATE.question_4_refus:
  //     this.theFormState = FORMSTATE.question_4_refus ;
  //     break;

  //     case FORMSTATE.question_5:
  //     this.theFormState = FORMSTATE.question_5 ;
  //     break;

  //     case FORMSTATE.question_6:
  //     this.theFormState = FORMSTATE.question_6 ;
  //     break;

  //     case FORMSTATE.question_7:
  //     this.theFormState = FORMSTATE.question_7 ;
  //     break;

  //     case FORMSTATE.question_8:
  //     this.theFormState = FORMSTATE.question_8 ;
  //     break;

      
  //     default:
  //     break;
  //   }
  // }
  
}
