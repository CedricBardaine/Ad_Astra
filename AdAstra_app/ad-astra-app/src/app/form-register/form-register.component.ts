import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
export interface NewUser {
  talents?: 
  {
    compositeur?: boolean,
    parolier?: boolean,
    arrangeur?: boolean, 
    auteurDeChansons?: boolean,
    chanteur?: boolean,
    musicienDeScene?: boolean,
    musicienDeStudio?: boolean,
    dj?: boolean
  };
  genres?: 
  {
    blues?: boolean,
    funk?: boolean,
    jazz?: boolean,
    metal?: boolean,
    pop?: boolean,
    punk?: boolean,
    rap?: boolean,
    rockNRoll?: boolean
  };
  services?:
  {
    aideManagement?: boolean,
    gestionDroits?: boolean,
    obtenirVisibilite?: boolean,
    devenirIntermittent?: boolean,
    mieuxConnaitre?: boolean,
    chercherSubvention?: boolean,
    faireReseau?: boolean
  };
  relationsVoulues?:
  {
    managers?: boolean,
    tourneurs?: boolean,
    labels?: boolean,
    editeurs?: boolean
  };
  infos?:
  {
    nom?: string,
    prenom?: string,
    nomArtiste?: string,
    email?: string,
    mdp?: string
  };
}

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  debugLabel = "" ; // FIXME: delete before prod
  theFormState: FORMSTATE ; 
  theStep2 = false ;
  
  theNewUser: NewUser ;
  
  // injects dependencies
  constructor(private http: HttpClient) {
    // this.theFormState = FORMSTATE.question_1;
  }
  
  ngOnInit() {
    this.theFormState = FORMSTATE.question_1;
    this.theNewUser = {} ; 
    this.theNewUser.talents = {} ; 
    this.theNewUser.genres = {} ; 
    this.theNewUser.services = {} ; 
    this.theNewUser.relationsVoulues = {} ; 
    this.theNewUser.infos = {} ; 
  }  
  
  
  onSubmit() {
    let postData = 
    {
      id_userStar: 777,
      artist_name:this.theNewUser.infos.nomArtiste,
      suscribed_until:"2020-07-25",
      suscribed:false,
      id_survey:777,
      checked:false
    };
    let url = 'http://localhost:5000/insert_artist';
    // let url = "http://httpbin.org/post"; // !!!! test url that returns the post datas
    
    this.http.post(url, postData).toPromise().then(data => {
      this.debugLabel = "Nouveau user enregistré ! " + JSON.stringify(data) ; 
      this.theStep2 = false ; 
      // TODO: go to the switchcase 9 created to mark the end of fin voila, la fin takompris
      // FIXME: bind and add row to the good tables in the DB, in order to have a clean user 
    });
  }

}
