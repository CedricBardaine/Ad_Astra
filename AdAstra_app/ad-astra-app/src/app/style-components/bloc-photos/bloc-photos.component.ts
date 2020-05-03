import { Component, OnInit } from "@angular/core";

@Component({
  selector: "aa-bloc-photos",
  templateUrl: "./bloc-photos.component.html",
  styleUrls: ["./bloc-photos.component.scss"],
})
export class BlocPhotosComponent implements OnInit {
  imagePaths: any[] = [
    "../../../assets/img/Odesza1.jpg",
    "../../../assets/img/Odesza2.png",
    "../../../assets/img/Odesza3.jpg",
    "../../../assets/img/Odesza4.jpg",
  ].slice(0, 7);

  arrayToDisplay: any[] = new Array(6);

  constructor() {}

  ngOnInit(): void {}
}
