import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "aa-header-loggedOut",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @HostBinding("class.aa-header-loggedOut") readonly rootClass = true;
  isBurgerClicked: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  burgerClick() {
    this.isBurgerClicked = !this.isBurgerClicked;
  }
}
