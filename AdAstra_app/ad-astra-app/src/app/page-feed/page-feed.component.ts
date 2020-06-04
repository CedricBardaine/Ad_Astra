import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {PATHS} from '../../globals';
import { AuthService } from '../auth.service';

interface Publication {
  id: number;
  kind: string; //PICTURE || VIDEO || AUDIO
  content: string;
  id_userStar: number;
  id_medias: number;
  
  profilPict_userStar: number;
  name_userStar: string;
}
interface TruePublication {
  id: number;
  kind: string; //PICTURE || VIDEO || AUDIO
  content: string;
  id_userStar: number;
  id_picture: number;
  id_video: number;
  id_audio: number;

  profilPict_userStar: number;
  name_userStar: string;
}


@Component({
  selector: 'app-page-feed',
  templateUrl: './page-feed.component.html',
  styleUrls: ['./page-feed.component.scss']
})
export class PageFeedComponent implements OnInit {
  
  
  thePublications:Publication[] = new Array ; 
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
    ) {}
  
  ngOnInit() {
    this.auth.verifyLoggedIn().subscribe(
      (res) => this.loadMorePublications() 
    );
    
  }

  loadMorePublications() {
    let sizeBefore = this.thePublications.length ; 
    this.fetch10Publications<TruePublication[]>().then( (fetched) => {
      fetched.forEach((t_publi) => {
        let newPublication: Publication = {
          id:null,
          kind:null,
          content:null,
          id_userStar:null,
          id_medias:null,
          profilPict_userStar:null,
          name_userStar:null
        }

        newPublication.id = t_publi.id; 
        newPublication.kind = t_publi.kind;
        newPublication.content = t_publi.content;
        newPublication.id_userStar = t_publi.id_userStar;
        if ( newPublication.kind == "PICTURE" ) newPublication.id_medias = t_publi.id_picture;
        if ( newPublication.kind == "VIDEO" ) newPublication.id_medias = t_publi.id_audio;
        if ( newPublication.kind == "AUDIO" ) newPublication.id_medias = t_publi.id_audio;
        newPublication.profilPict_userStar = t_publi.profilPict_userStar ; 
        newPublication.name_userStar = t_publi.name_userStar ; 

        this.thePublications.push(newPublication); 
      })
      if ( sizeBefore == this.thePublications.length) this.errorFetching = true ; 
    });
    // console.log(this.thePublications);
  }

  iStart:number = 0 
  errorFetching:boolean = false ; 
  fetch10Publications<T>(): Promise<T> {
      return fetch("http://localhost:5000/get_10_pubblications?start="+this.iStart++)
      .then(response => {
        if (response.status == 500 || response == null) this.errorFetching = true ; 
        else {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          // return response.json<T>()
          return response.json()
        }
      });
  }  
}
