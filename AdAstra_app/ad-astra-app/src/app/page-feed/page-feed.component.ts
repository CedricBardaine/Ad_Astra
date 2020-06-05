import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {PATHS} from '../../globals';
import { AuthService } from '../auth.service';
import { stringify } from 'querystring';
import { FormBuilder, FormGroup } from '@angular/forms';


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
interface ToSendPublication {
  kind: string; //PICTURE || VIDEO || AUDIO
  content: string; 
  id_userStar: number; 
  id_media: number; 
}

@Component({
  selector: 'app-page-feed',
  templateUrl: './page-feed.component.html',
  styleUrls: ['./page-feed.component.scss']
})
export class PageFeedComponent implements OnInit {
  btnMusicSelected: boolean = false; 
  btnVidSelected: boolean = false; 
  btnPictSelected: boolean = false; 
  theNewPublication: ToSendPublication = {
    kind: "NONE", content: "", id_userStar: null, id_media: null
  };
  theFileToUpload: any[] = [''];
  errorMsg:string;
  uploadForm: FormGroup ;
  
  thePublications:Publication[] = new Array ; 
  
  APIPOINT_Picture:string = PATHS.API_ENDPOINT+"insert_Picture2"; 
  APIPOINT_Video:string = PATHS.API_ENDPOINT+"insert_Video"; 
  APIPOINT_Audio:string = PATHS.API_ENDPOINT+"insert_Audio"; 
  APIPOINT_Publication:string = PATHS.API_ENDPOINT+"insert_Publication"; 
  
  
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient,
    private fB: FormBuilder // must import ReactiveFormsModule 
    ) {}
    
    ngOnInit() {
      this.auth.getLoggedUserId().subscribe(
        (res) => {
          this.theNewPublication.id_userStar = res; 
          this.loadMorePublications();} 
          );
          this.uploadForm = this.fB.group({
            id_userStar: this.theNewPublication.id_userStar,
            pict: ['']
          });
        }
        
        /**
        * Specify wich media (or if no media) will be attached to the publication.
        * Depending on {@link this.theNewPublication.kind} value, the component won't post the same request in {@link PageFeedComponent.sendNewPubli}.
        * @param mediaType the param of the fonction in the HTML that indicates wich button as been selected. 
        */
        selectMedia(mediaType: string) {
          switch (mediaType) {
            case "music":
            this.btnMusicSelected = true ;
            this.btnVidSelected = false ; 
            this.btnPictSelected = false ;  
            this.theNewPublication.kind = "AUDIO";
            break;
            case "vid":
            this.btnMusicSelected = false ;
            this.btnVidSelected = true ; 
            this.btnPictSelected = false ; 
            this.theNewPublication.kind = "VIDEO";
            break;
            case "pict":
            this.btnMusicSelected = false ;
            this.btnVidSelected = false ; 
            this.btnPictSelected = true ; 
            this.theNewPublication.kind = "PICTURE";
            break;
            case "none":
            this.btnMusicSelected = false ;
            this.btnVidSelected = false ; 
            this.btnPictSelected = false ; 
            this.theNewPublication.kind = "NONE";
            this.theFileToUpload = [''] ; 
            break;
            default:
            break;
          }
        }
        
        /**
        * Retrieve the file selected by the client with the buttons Music, Audio or Video.
        * Once retrieved, set it to the class attribut {@link PageFeedComponent.theFileToUpload}.
        * @param e the event from where the file is retrieved.
        */
        onFileChange(e) {
          // let fileList: FileList = event.target.files;
          // console.log(fileList.length); 
          // if(fileList.length > 0) {
          //   let file: File = fileList[0];
          //   let formData:FormData = new FormData();
          //   formData.append('uploadFile', file, file.name);
          // }
          
          this.theFileToUpload = e.target.files[0]; 
          this.uploadForm.get('pict').setValue(e.target.files[0]);
        }
        
        /**
        * Send the Publication to the DB.
        * @version 0.1.0 only send a Publication without media.  
        */
        sendNewPubli() {
          let customeHttpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'bearer ' + this.auth.getToken() 
              ,
              // "Content-Type": "multipart/form-data",
              // "Content-Type": "multipart/form-data; boundary=???",
              // 'Accept': 'application/json',
              "Content-Type": "application/json",
              // 'enctype': 'multipart/form-data',
            }),
            responseType:'text' as 'json'
          };
          let customBody = {
            id_userStar: this.theNewPublication.id_userStar,
            pict: this.theFileToUpload
          }
          
          
          const formData: FormData =  new FormData() ; 
          
          // formData.append('1', new Blob(this.theFileToUpload), 'newImage');
          // formData.append("datas", JSON.stringify(customBody));
          
          formData.append('pict', this.uploadForm.get('pict').value);
          formData.append('id_userStar', this.theNewPublication.id_userStar.toString());
          
          // console.log("the formData : "+ formData);
          formData.forEach(element => {
            console.log(element)
          });
          
          
          
          if(this.theNewPublication.content.length <= 1) 
          this.errorMsg = "le texte de la publication doit être plus long.";
          else {
            
            // console.log("all" , this.theNewPublication.kind , this.theNewPublication.id_userStar , this.theFileToUpload)
            // ;
            if(this.theNewPublication.kind != null  &&
              this.theNewPublication.id_userStar != null &&
              this.theFileToUpload != undefined ) {
                switch (this.theNewPublication.kind) {
                  case "AUDIO":
                  console.log("uploading audio")
                  
                  break;
                  case "VIDEO":
                  console.log("uploading video")
                  break;
                  case "PICTURE":
                  console.log("uploading picture")
                  // this.http.post<any>(this.APIPOINT_Picture, customBody , customeHttpOptions ).subscribe({
                  //   next: data =>{console.log("data : ", data)},
                  //   error: error => {console.log("error : ", error)}
                  // });
                  this.http.post<any>(this.APIPOINT_Picture, JSON.stringify({ 
                    pict: this.theFileToUpload,
                    id_userStar: this.theNewPublication.id_userStar
                  }), customeHttpOptions ).subscribe({
                    next: data =>{console.log("data : ", data)},
                    error: error => {console.log("error : ", error)}
                  });
                  // this.http.post<any>(this.APIPOINT_Picture, {id_userStar: 5} , customeHttpOptions ).subscribe({
                  //   next: data =>{console.log("data : ", data)},
                  //   error: error => {console.log("error : ", error)}
                  // });
                  // // this.http.post<any>(this.APIPOINT_Picture, formData, customeHttpOptions ).subscribe({
                  // //   next: data =>{console.log("data : ", data)},
                  // //   error: error => {console.log("error : ", error)}
                  // // });
                  break;
                  case "NONE":
                  console.log("uploading without media");
                  this.http.post<any>(
                    this.APIPOINT_Publication, 
                    JSON.stringify({ 
                      kind: this.theNewPublication.kind,
                      content: this.theNewPublication.content,
                      id_userStar: this.theNewPublication.id_userStar
                    }),
                    customeHttpOptions ).subscribe({
                      next: data =>{
                        data = JSON.parse(data);
                        console.log("data : ", data);
                        if(data.affectedRows == 1) this.clearNewPublie(); 
                      },
                      error: error => {
                        console.log("error : ", error);
                        this.errorMsg = "Il y a eu un problème."
                      }
                    });
                    break;
                    default:
                    break;
                  }
                }
              }
            }
            
            /**
            * Reset the new Publication form.
            */
            clearNewPublie() {
              this.theNewPublication.kind = "NONE";
              this.theNewPublication.content = "";
            }
            
            /**
            * Call {@link PageFeedComponent.fetch10Publications} to fetch 10 publication from API. 
            * Add them to the Publications List. 
            */
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
