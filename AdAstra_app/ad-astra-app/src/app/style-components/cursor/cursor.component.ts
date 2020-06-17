import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "aa-cursor",
  templateUrl: "./cursor.component.html",
  styleUrls: ["./cursor.component.scss"],
})
export class CursorComponent implements OnInit {
  top: any;
  left: any;

  constructor() {}

  @HostListener("document:mousemove", ["$event"])
  onMouseMove($event) {
    this.top = $event.pageY - 15 + "px";
    this.left = $event.pageX - 15 + "px";
  }

  ngOnInit() {}
}
