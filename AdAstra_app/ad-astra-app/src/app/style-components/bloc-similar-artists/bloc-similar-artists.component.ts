import { Component, OnInit } from "@angular/core";

@Component({
  selector: "aa-bloc-similar-artists",
  templateUrl: "./bloc-similar-artists.component.html",
  styleUrls: ["./bloc-similar-artists.component.scss"],
})
export class BlocSimilarArtistsComponent implements OnInit {
  similarArtists: any[] = [
    { image: "../../../assets/img/SG-Lewis.jpg", name: "SG Lewis" },
    { image: "../../../assets/img/Jai Wolf.jpg", name: "Jai Wolf" },
    { image: "../../../assets/img/Shallou.jpg", name: "Shallou" },
  ].slice(0, 5);

  arrayToDisplay: any[] = new Array(4);

  constructor() {}

  ngOnInit() {}
}
