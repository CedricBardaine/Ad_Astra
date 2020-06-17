import { Component, OnInit, HostBinding, Input } from "@angular/core";

@Component({
  selector: "aa-home-artists-card",
  templateUrl: "./home-artists-card.component.html",
  styleUrls: ["./home-artists-card.component.scss"],
})
export class HomeArtistsCardComponent implements OnInit {
  @HostBinding("class.aa-artist-card") readonly rootClass = true;
  @HostBinding("class.-book") @Input() isBook: boolean = false;
  @HostBinding("class.-accompagnement") @Input() isArrow: boolean = false;
  @HostBinding("class.-relation") @Input() isHand: boolean = false;

  constructor() {}

  ngOnInit() {}
}
