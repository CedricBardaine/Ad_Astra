import { Component, OnInit, Input } from '@angular/core';

import {PATHS} from '../../globals';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  mediapath = PATHS.ADASTRA_MEDIAS_PATH ;
  
  @Input('id') 
  id: number;
  @Input('kind')
  kind: string; //PICTURE || VIDEO || AUDIO
  @Input('content')
  content: string;
  @Input('id_userStar')
  id_userStar: number;
  @Input('id_medias')
  id_medias: number;
  
  @Input('profilPict_userStar')
  profilPict_userStar: number;
  @Input('name_userStar')
  name_userStar: string;
  
  constructor() { }
  
  ngOnInit() {
  }

  /**
   * TODO: create likePublication()
   * @param idpubli id of the publication to like by the userStar 
   */
  likePublication(idpubli: number) { console.log("todo") }
  /**
   * TODO: create sharePublication()
   * Allow to copy the link to the publication (certainly return a page were a unique publication is displayed with it's replies bellow)
   * @param idpubli id of the publication to like by the userStar 
   */
  sharePublication(idpubli: number) { console.log("todo") }
  
}
