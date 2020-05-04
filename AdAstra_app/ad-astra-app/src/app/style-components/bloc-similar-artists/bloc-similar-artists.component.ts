import { Component, OnInit } from "@angular/core";

@Component({
  selector: "aa-bloc-similar-artists",
  templateUrl: "./bloc-similar-artists.component.html",
  styleUrls: ["./bloc-similar-artists.component.scss"],
})
export class BlocSimilarArtistsComponent implements OnInit {
  imagePaths: any[] = [
    "../../../assets/img/SG-Lewis.jpg",
    "../../../assets/img/Jai Wolf.jpg",
    "../../../assets/img/Shallou.jpg",
  ].slice(0, 5);

  names: any[] = ["SG Lewis", "Jai Wolf", "Shallou"].slice(0, 5);

  arrayToDisplay: any[] = new Array(4);

  constructor() {}

  ngOnInit() {}
}
