import { Component, OnInit } from '@angular/core';

import { Email } from '../../assets/libs/smtp' ; 


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
  
  stateInfo:string; 
  
  constructor() { }
  
  ngOnInit() {
  }
  
  /**
  * @version 1.0 change this.isPro according to the parameter.
  * @deprecated now, directly change the value in html.
  */
  setPro(isPro:boolean) {
    isPro ? this.isPro = true : this.isPro = false ; 
  }
  
  /**
   * Create an email with the values from the fields of the form in the html.
   * @return an email ready to be sent. 
   */
  buildMail(): string {
    let ret:string;
    
    let statut:string; 
    this.isPro ? statut = "Professionnel" : statut = "Artiste";
    
    ret = "<i>Message de contact en provenance d'Ad-Astra.</i> <br/>"
    + "<b>Sujet : </b>"+ this.subject +"<br>"
    + "<b>Nom : </b>"+ this.name +"<br>"
    // + "<b>Email utilisateur : </b>" //TODO: ? si il faut etre connecté pour envoyer un mai, on peut récupérer son email
    + "<b>Statut : </b>"+ statut +"<br>"
    + "<b>Message : </b> <br>"
    + this.message
    + "<br><b>Fin du message.</b> <br>"
    
    return ret ; 
  }
  
  /**
   * Send the email with the SmtpJS lib. It requires, amongst others, the {@link PageContactComponent.buildMail} fonction.
   * @see [SmtpJS](https://www.smtpjs.com/)
   */
  onSubmitContactForm() {
    console.log("Submitting mail... 🌞");
    
    if(this.name == null) { this.stateInfo = "name is missing"; }
    else {
      if(this.subject == null) { this.stateInfo = "subject is missing"; }
      else {
        if(this.isPro == null) { this.stateInfo = "isPro is missing"; }
        else {
          if(this.message == null || this.message == "") { this.stateInfo = "message is missing"; }
          else {
            // FIXME: change credentials ?! NOT SECURED!!!
            
            Email.send({
              Host : 'smtp.elasticemail.com',
              Username : 'cedricbardaine@gmail.com',
              Password : '7D42AB7568FE15973ACA2CCD7EC717CFEAFB',
              To : 'cedricbardaine@gmail.com',
              From : `cedricbardaine@gmail.com`,
              Subject : this.subject,
              Body : this.buildMail()
              
            }).then( message => {
              console.log("Mail sent : " + message); // FIXME: FM7 (indications en trop dans la console)... 
              if (message == "OK")  {
                this.stateInfo = "Mail envoyé ! ☄️" 
                this.clearFields();
              }
              else
              this.stateInfo = "Zut, le message n'a pas pu s'envoyer... 💫";
            } );
            
          }
        }
      }
    }
  }
  
  /**
   * Clears the form fields.
   */
  clearFields() {
    this.name = null ; 
    this.subject = null ; 
    // this.isPro = null ; //don't modify since i don't know yet the way to unselected both of the radio buttons
    this.message = null ; 
  }

}
