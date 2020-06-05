import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-page404",
  templateUrl: "./page404.component.html",
  styleUrls: ["./page404.component.scss"],
})
export class Page404Component implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    document.body.classList.add("-no-scroll");
  }

  ngOnDestroy() {
    document.body.classList.remove("-no-scroll");
  }
}
