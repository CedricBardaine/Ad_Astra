import { Component, OnInit, HostBinding, Input } from "@angular/core";

@Component({
  selector: "aa-btn-noLink",
  templateUrl: "./button-no-link.component.html",
  styleUrls: ["./button-no-link.component.scss"],
})
export class ButtonNoLinkComponent implements OnInit {
  @HostBinding("class.aa-btn-noLink") readonly rootClass = true;
  @HostBinding("class.-secondary") @Input() isSecondary: boolean = false;
  @HostBinding("class.-large") @Input() isLarge: boolean = false;
  @HostBinding("class.-disabled") @Input() isDisabled: boolean = false;
  @Input("btnText") public btnText: string;
  constructor() {}

  ngOnInit() {}
}
