import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {PATHS} from '../../globals';

interface Artist {
  id: number;
  name: string;
  pict: string;
  nbFollowers: number; 
  nbFollowing: number;
  bio: string;
  idsHeadMusics: [number,number,number]; // the three music that are "à la une"
  idsHeadPhotos: [number,number,number,number,number,number];
}

@Component({
  selector: 'app-page-artist',
  templateUrl: './page-artist.component.html',
  styleUrls: ['./page-artist.component.scss']
})
export class PageArtistComponent implements OnInit {
  artist: Artist = {
    id:null,
    name:null,
    pict:null,
    nbFollowers:null,
    nbFollowing:null,
    bio:null,
    idsHeadMusics:null,
    idsHeadPhotos:null
  } ; 

  mediaspath = PATHS.ADASTRA_MEDIAS_PATH;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) {}
    
    ngOnInit() {
      this.artist.id = +this.route.snapshot.paramMap.get('id');
      
      this.fetchUserInfos<Artist>(this.artist.id)
      .then((fetched) => {
        console.log(fetched)
        this.artist.id = fetched.id ; 
        this.artist.name = fetched.name ; 
        this.artist.pict = fetched.pict ; 
        this.artist.bio = fetched.bio ; 
      })
      .catch(error => {
        console.log("error while fetching the Artist infos ! ");
      }) ;
      
      
      
      // tmpArtist = 
      
      // // Valide, mais sale.
      // // La solution pour que cela marche en propre est peut-etre de faire de this.artist un Observable d'une interface Artist
      // this.artist.id = this.route.paramMap.pipe(
      //   switchMap((params: ParamMap) =>
      //    params.get('id'))
      // ); 
      // this.artist.id = this.artist.id.destination.destination._value.id ; 
    }
    
    fetchUserInfos<T>(fetechId: number): Promise<T> {
      return fetch("http://localhost:5000/get_infos_Artist?id="+fetechId)
      .then(response => {
        if (response.status == 204) this.router.navigate(["404"]); // if the bdd has no Artist with this id, redirect to 404 (for the user it's a 404 anyway) 
        else 
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        // return response.json<T>()
        return response.json()
      })
    }
    
    // FIXME : FM7
    // gotToNext() {
    //   var tmp = 7 ; 
    //   this.router.navigate(['artist',tmp]) ; 
    // }
    
  }
