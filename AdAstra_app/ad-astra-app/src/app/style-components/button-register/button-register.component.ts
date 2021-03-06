import { Component, OnInit, HostBinding, Input } from "@angular/core";

@Component({
  selector: "aa-btn-register",
  templateUrl: "./button-register.component.html",
  styleUrls: ["./button-register.component.scss"],
})
export class ButtonRegisterComponent implements OnInit {
  @HostBinding("class.aa-btn-register") readonly rootClass = true;
  @HostBinding("class.-red")
  @Input()
  isRed: boolean = false;
  @HostBinding("class.-secondary")
  @Input()
  isSecondary: boolean = false;
  @HostBinding("class.-small")
  @Input()
  isSmall: boolean = false;
  @HostBinding("class.-sign")
  @Input()
  isConnect: boolean = false;
  @HostBinding("class.-large")
  @Input()
  isLarge: boolean = false;
  @Input("btnText") public btnText: string;
  @Input("btnLink") public btnLink: string;
  @Input('btnHasRouterLink') public btnHasRouterLink;

  /*
  < < < < < < < HEAD
  @Input('btnText') public btnText: string;
  @Input('btnLink') public btnLink: string;

  @Input('btnHasRouterLink') public btnHasRouterLink: boolean;
  */
  constructor() {}

  ngOnInit(): void { 
    // the btnHasRouterLink attribut is to explicitly aks to prevents the button to redirect,
    // it may be useful for button that executes a fonction
    if (this.btnHasRouterLink == undefined || this.btnHasRouterLink  == null)
      this.btnHasRouterLink = 'true' ; 
  }
}
