import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-page-artist',
  templateUrl: './page-artist.component.html',
  styleUrls: ['./page-artist.component.css']
})
export class PageArtistComponent implements OnInit {
  artisteId: any;
  tab = [1,2,3] ; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.artisteId = this.route.snapshot.paramMap.get('id');
    
    // // Valide, mais sale.
    // this.artisteId = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //    params.get('id'))
    // ); 
    // this.artisteId = this.artisteId.destination.destination._value.id ; 
  }

  // FIXME : FM
  // gotToNext() {
  //   var tmp = 7 ; 
  //   this.router.navigate(['artist',tmp]) ; 
  // }

}
