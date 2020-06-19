import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service' 

@Component({
  selector: 'app-header-logged-in-or-out',
  templateUrl: './header-logged-in-or-out.component.html',
  styleUrls: ['./header-logged-in-or-out.component.scss']
})
export class HeaderLoggedInOrOutComponent implements OnInit {
  logged: boolean ;

  constructor(private auth: AuthService) {
    this.logged = this.auth.loggedIn() ; 
   }

  ngOnInit() {
  }

}
