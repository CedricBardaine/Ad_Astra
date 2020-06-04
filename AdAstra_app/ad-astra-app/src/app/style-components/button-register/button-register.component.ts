import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'aa-button-register',
  templateUrl: './button-register.component.html',
  styleUrls: ['./button-register.component.scss'],
})
export class ButtonRegisterComponent implements OnInit {
  @HostBinding('class.btn__register') readonly rootClass = true;
  @HostBinding('class.btn__register--red')
  @Input()
  isRed: boolean = false;
  @HostBinding('class.btn__register--secondary')
  @Input()
  isSecondary: boolean = false;
  @Input('btnText') public btnText: string;
  @Input('btnLink') public btnLink: string;

  @Input('btnHasRouterLink') public btnHasRouterLink: boolean;

  constructor() {}

  ngOnInit(): void {}
}
