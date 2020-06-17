import { Component, OnInit, HostBinding, Input } from "@angular/core";

@Component({
  selector: "aa-home-professionals-card",
  templateUrl: "./home-professionals-card.component.html",
  styleUrls: ["./home-professionals-card.component.scss"],
})
export class HomeProfessionalsCardComponent implements OnInit {
  @HostBinding("class.aa-professional-card") readonly rootClass = true;
  @HostBinding("class.-planet") @Input() isPlanet: boolean = false;
  @HostBinding("class.-checked") @Input() isCheck: boolean = false;

  constructor() {}

  ngOnInit() {}
}
