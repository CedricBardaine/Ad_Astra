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
    date?:Date,
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
  debugLabel = "" ; // FIXME: FM7 delete before prod
  theFormState: FORMSTATE ; 
  theStep2 = false ;
  confirmPassWord = "";
  errorInRegisterForm = "";
  
  theNewUser: NewUser ;
  
  // injects dependencies
  constructor(private http: HttpClient) {
    // this.theFormState = FORMSTATE.question_1;
  }
  
  ngOnInit() {
    this.theFormState = FORMSTATE.question_1;
    
    // inits for the checkboxes 
    this.theNewUser = {} ; 
    this.theNewUser.talents = {} ; 
    this.theNewUser.genres = {} ; 
    this.theNewUser.services = {} ; 
    this.theNewUser.relationsVoulues = {} ; 
    this.theNewUser.infos = {} ; 
  }  
  
  /**
  * Verify if the NewUser is older than 16. 
  * If yes : the form continue.
  * If no : the registration stops. 
  */
  birthDateValidation() {
    let uBDate = new Date ( this.theNewUser.infos.date ) ;
    let tooYoung:boolean;
    let today = new Date();
    let minYear = today.getFullYear()-16;
    let minMonth = today.getMonth();
    let minDay = today.getDate();
    
    if ( uBDate.getFullYear() < minYear ) tooYoung = false; 
    else if (uBDate.getFullYear() > minYear) tooYoung = true; 
    else if (uBDate.getFullYear() == minYear) {
      if (uBDate.getMonth() < minMonth) tooYoung = false;
      else if (uBDate.getMonth() > minMonth ) tooYoung = true;
      else if (uBDate.getMonth() == minMonth) {
        if ( uBDate.getDate() < minDay ) tooYoung = false; 
        else if ( uBDate.getDate() > minDay ) tooYoung = true; 
        else if ( uBDate.getDate() == minDay ) {
          // !!!! souhaiter un bon anniverssaire ? ^^'
          tooYoung = false;
        }
      }
    }
    
    if (tooYoung) this.theFormState = -3 ; 
    else this.theFormState = 4 ; 
  }
  
  /**
  * Send the form data to the API, adding rows in the good tables and binding them. 
  * // TODO: add a case when there is a problem
  * // FIXME: bind and add row to the good tables in the DB, in order to have a clean user 
  */
  onSubmit() {
    if ( this.customFormValidation() ) {
      
      let dateSuscribe = this.getcurrentDate("yyyy","mm","dd", "-"); 
      
      let postDataUserStar = 
      {
        firstname:this.theNewUser.infos.prenom,
        lastname:this.theNewUser.infos.nom,
        // birth:2020-03-13 // FIXME: obtain actual date of the new user, not only a yes no
        mail:this.theNewUser.infos.email, 
        password:this.theNewUser.infos.mdp, // FIXME: find a way to have it encrypted
        sign_in_date:dateSuscribe,
        id_profession:1,  // 1 : "Artiste"
        id_country:1      // 1 : "France"
      };
      let postDataSurvey = 
      {
        content:"?..." // TODO: decide what to do with this table
      }
      let postDataArtist = 
      {
        id_userStar: 0,
        artist_name:this.theNewUser.infos.nomArtiste,
        // suscribed_until:"2020-07-25",
        suscribed:false,
        id_survey:0,
        checked:false
      };
      
      let urlToUserStar = 'http://localhost:5000/insert_UserStar';
      let urlToSurvey = 'http://localhost:5000/insert_Survey';
      let urlToArtist = 'http://localhost:5000/insert_artist';
      
      let returnOfToUserStar ;
      let returnOfToSurvey ;
      let returnOfToArtist ;
      // let returnOfToArtistTalent ;
      // let returnOfToArtistNeed ;
      
      this.http.post(urlToUserStar, postDataUserStar).toPromise().then(dataUserStar => {
        returnOfToUserStar = dataUserStar ; 
        
        if ( returnOfToUserStar.insertId) {
          this.http.post(urlToSurvey, postDataSurvey).toPromise().then(dataSurvey => {
            returnOfToSurvey = dataSurvey ; 
            
            if ( returnOfToSurvey.insertId) { 
              postDataArtist.id_userStar = returnOfToUserStar.insertId ; 
              postDataArtist.id_survey = returnOfToSurvey.insertId ; 
              
              this.http.post(urlToArtist, postDataArtist).toPromise().then(dataArtist => {
                returnOfToArtist = dataArtist ; 
                
                if ( returnOfToArtist.insertId) {
                  this.debugLabel = this.postDataToArtistTalent(returnOfToArtist.insertId) ; 
                  this.debugLabel += this.postDataToArtisteNeed(returnOfToArtist.insertId) ; 
                }
                
                // FIXME: terminer :  en fin d'insertion de tout on  vérifie :   tout est bon ? on désafiche le form : on annule (delete) tout et on affiche une erreur  parceque le mettre ici c'est un peu borderline niveau propreté de code.....
                // Utiliser pour cela les returnOfToUserStar et supprimer les dernières insertions correspondantes
                if ( returnOfToArtist.insertId ) {
                  this.debugLabel = "Nouveau user enregistré ! " + JSON.stringify(dataArtist) ; 
                  this.theStep2 = false ; 
                  this.theFormState = 9 ; 
                }
              });
            }
            
          });
          
          this.postDataToUserStar_MusicalStyle(returnOfToUserStar.insertId) ; 
          
        }
      });
    }
    else { this.errorInRegisterForm += " !"; }
  }
  
  /**
  * @return true if the values of the form (both part1 and 2) are correct 
  * and good to be inserted in DB. 
  * //TODO: verif names length
  * //TODO: verif if at least one checkboxe by categories is checked
  */
  customFormValidation() {
    let ret:boolean = false; 
    // throw new Error("Method not implemented.");
    
    if (this.theNewUser.infos.nom && this.theNewUser.infos.prenom) {
      ret = true;

      if ( this.validateEmail(this.theNewUser.infos.email) ) {
        ret = true;
        
        if ( this.theNewUser.infos.mdp.toString() == this.confirmPassWord.toString() ) {
          ret = true;
        }

        else {
          ret = false; 
          this.errorInRegisterForm = "Attention, les mots de passes ne correspondent pas"
        }
      } 
      else {
        ret = false; 
        this.errorInRegisterForm = "L'addresse email n'est pas correcte"; 
      } 
    }
    else {
      ret = false; 
      this.errorInRegisterForm = "Veuillez rentrer votre nom et votre prénom";
    }
    
    
    return ret; 
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    return re.test(String(email).toLowerCase());
  }
  
  
  /**
  * Send post request to add rows in Artist_Talent table for each talents of this.theNewUser .
  * @param idArtist 
  * @return all the responses of API
  */
  postDataToArtistTalent(idArtist) {
    let postDataArtistTalent = {
      id_artist:0,
      id_talent:0
    };
    let urlToArtistTalent = "http://localhost:5000/insert_Artist_Talent";
    let ret = "{" ;
    
    postDataArtistTalent.id_artist = idArtist ; 
    let talents = this.theNewUser.talents ; 
    for ( var key in talents) {
      // console.log(key , " - " , talents[key]) ; 
      switch (key) {
        case "compositeur" :
        postDataArtistTalent.id_talent = 1 ;
        this.http.post( urlToArtistTalent , postDataArtistTalent).toPromise().then(dataArtistTalent => {
          ret += dataArtistTalent + ","; 
        }); 
        break;
        case "parolier" :
        postDataArtistTalent.id_talent = 2 ;
        this.http.post( urlToArtistTalent , postDataArtistTalent).toPromise().then(dataArtistTalent => {
          ret += dataArtistTalent + ","; 
        }); 
        break;
        case "arrangeur" :
        postDataArtistTalent.id_talent = 3 ;
        this.http.post( urlToArtistTalent , postDataArtistTalent).toPromise().then(dataArtistTalent => {
          ret += dataArtistTalent + ","; 
        }); 
        break;
        case "auteurDeChansons" :
        postDataArtistTalent.id_talent = 4 ;
        this.http.post( urlToArtistTalent , postDataArtistTalent).toPromise().then(dataArtistTalent => {
          ret += dataArtistTalent + ","; 
        }); 
        break;
        case "chanteur" :
        postDataArtistTalent.id_talent = 5 ;
        this.http.post( urlToArtistTalent , postDataArtistTalent).toPromise().then(dataArtistTalent => {
          ret += dataArtistTalent + ","; 
        }); 
        break;
        case "musicienDeScene" :
        postDataArtistTalent.id_talent = 6 ;
        this.http.post( urlToArtistTalent , postDataArtistTalent).toPromise().then(dataArtistTalent => {
          ret += dataArtistTalent + ","; 
        }); 
        break;
        case "musicienDeStudio" :
        postDataArtistTalent.id_talent = 7 ;
        this.http.post( urlToArtistTalent , postDataArtistTalent).toPromise().then(dataArtistTalent => {
          ret += dataArtistTalent + ","; 
        }); 
        break;
        case "dj" :
        postDataArtistTalent.id_talent = 8 ;
        this.http.post( urlToArtistTalent , postDataArtistTalent).toPromise().then(dataArtistTalent => {
          ret += dataArtistTalent + ","; 
        }); 
        break;
        default :
        this.debugLabel = "ERROR! in posting ArtistTalent"; 
        break;
      }
      ret += "}" ; // FIXME: FM306 return ce string ; "{}}" donc voir si ça peut s'arranger avec   JSON.stringify(data)  par ex. 
    }
    
    return ret ; 
  }
  
  /**
  * Send post request to add rows in Artist_Need table for each services of this.theNewUser .
  * @param idArtist 
  * @return all the responses of API
  */
  postDataToArtisteNeed(idArtist) {
    let postDataArtistNeed = 
    {
      id_artist:0,
      id_need:0
    };
    let urlToArtistTalent = "http://localhost:5000/insert_Artist_Need";
    let ret = "{" ;
    
    postDataArtistNeed.id_artist = idArtist ; 
    let services = this.theNewUser.services ; 
    for ( var key in services) {
      // console.log(key , " - " , services[key]) ; 
      switch (key) {
        case "aideManagement" :
        postDataArtistNeed.id_need = 1 ;
        this.http.post( urlToArtistTalent , postDataArtistNeed).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "gestionDroits" :
        postDataArtistNeed.id_need = 2 ;
        this.http.post( urlToArtistTalent , postDataArtistNeed).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "obtenirVisibilite" :
        postDataArtistNeed.id_need = 3 ;
        this.http.post( urlToArtistTalent , postDataArtistNeed).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "devenirIntermittent" :
        postDataArtistNeed.id_need = 4 ;
        this.http.post( urlToArtistTalent , postDataArtistNeed).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "mieuxConnaitre" :
        postDataArtistNeed.id_need = 5 ;
        this.http.post( urlToArtistTalent , postDataArtistNeed).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "chercherSubvention" :
        postDataArtistNeed.id_need = 6 ;
        this.http.post( urlToArtistTalent , postDataArtistNeed).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "faireReseau" :
        postDataArtistNeed.id_need = 7 ;
        this.http.post( urlToArtistTalent , postDataArtistNeed).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        default :
        this.debugLabel = "ERROR! in posting ArtistTalent"; 
        break;
      }
      ret += "}" ; // FIXME: FM306 
    }
    
    return ret ; 
  }
  
  /**
  * Send post request to add rows in UserStar_MusicalStyle table for each genres of this.theNewUser .
  * @param idArtist 
  * @return all the responses of API
  */
  postDataToUserStar_MusicalStyle(idArtist) {
    let postData_USMS = 
    {
      id_userStar:0,
      id_Musical_style:0
    };
    let url_USMS = "http://localhost:5000/insert_UserStar_Musical_style";
    let ret = "{" ;
    
    postData_USMS.id_userStar = idArtist ; 
    let genres = this.theNewUser.genres ; 
    for ( var key in genres) {
      switch (key) {
        case "blues" :
        postData_USMS.id_Musical_style = 1 ;
        this.http.post( url_USMS , postData_USMS).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "funk" :
        postData_USMS.id_Musical_style = 2 ;
        this.http.post( url_USMS , postData_USMS).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "jazz" :
        postData_USMS.id_Musical_style = 3 ;
        this.http.post( url_USMS , postData_USMS).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "metal" :
        postData_USMS.id_Musical_style = 4 ;
        this.http.post( url_USMS , postData_USMS).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "pop" :
        postData_USMS.id_Musical_style = 5 ;
        this.http.post( url_USMS , postData_USMS).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "punk" :
        postData_USMS.id_Musical_style = 6 ;
        this.http.post( url_USMS , postData_USMS).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "rap" :
        postData_USMS.id_Musical_style = 7 ;
        this.http.post( url_USMS , postData_USMS).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        case "rockNRoll" :
        postData_USMS.id_Musical_style = 8 ;
        this.http.post( url_USMS , postData_USMS).toPromise().then(data => {
          ret += data + ","; 
        }); 
        break;
        default :
        this.debugLabel = "ERROR! in posting ArtistTalent"; 
        break;
      }
      ret += "}" ; // FIXME: FM306
    }
    
    return ret ; 
  }
  
  
  
  
  
  /**
  * @param unit1 either "dd" or "mm" or "yyyy" (day, month, year).
  * @param unit2 either "dd" or "mm" or "yyyy" (day, month, year).
  * @param unit3 either "dd" or "mm" or "yyyy" (day, month, year).
  * @param separator the symbol inserted between values.
  * @return the current date as the gived format.
  */
  getcurrentDate(unit1:string,  unit2:string,  unit3:string, separator:string) {
    let ret:string = "" ;
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    switch (unit1) {
      case "dd": 
      ret += dd ;
      break;
      case "mm": 
      ret += mm ;
      break;
      case "yyyy": 
      ret += yyyy ;
      break;
    }
    
    ret += separator ; 
    
    switch (unit2) {
      case "dd": 
      ret += dd ;
      break;
      case "mm": 
      ret += mm ;
      break;
      case "yyyy": 
      ret += yyyy ;
      break;
    }
    
    ret += separator ; 
    
    switch (unit3) {
      case "dd": 
      ret += dd ;
      break;
      case "mm": 
      ret += mm ;
      break;
      case "yyyy": 
      ret += yyyy ;
      break;
    }
    
    return ret ; 
  }
}
