import { Component, OnInit, HostBinding, Renderer2 } from "@angular/core";

@Component({
  selector: "aa-header-loggedIn",
  templateUrl: "./header-logged-in.component.html",
  styleUrls: ["./header-logged-in.component.scss"],
})
export class HeaderLoggedInComponent implements OnInit {
  @HostBinding("class.aa-header-loggedIn") readonly rootClass = true;
  isOpen: boolean = false;
  hasNotification: boolean = true;
  isBurgerClicked: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  handleNotification() {
    this.isOpen = !this.isOpen;
    this.hasNotification = false;
  }

  burgerClick() {
    this.isBurgerClicked = !this.isBurgerClicked;
  }
}
