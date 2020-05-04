import { Component, OnInit } from "@angular/core";
import * as AOS from "aos";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "ad-astra-app";

  constructor() {}

  ngOnInit() {
    AOS.init({
      duration: 1000,
      useClassNames: false,
      offset: 200,
      once: true,
      easing: "aa-easing",
    });
  }
}
