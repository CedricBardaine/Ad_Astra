import { Component, OnInit, Input, HostBinding } from "@angular/core";

@Component({
  selector: "aa-btn",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @HostBinding("class.aa-btn") readonly rootClass = true;
  @HostBinding("class.-secondary") @Input() isSecondary: boolean = false;
  @HostBinding("class.-large") @Input() isLarge: boolean = false;
  @HostBinding("class.-disabled") @Input() isDisabled: boolean = false;
  @Input("btnText") public btnText: string;
  @Input("btnLink") public btnLink: string;
  constructor() {}

  ngOnInit(): void {}
}
