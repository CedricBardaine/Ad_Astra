import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'aa-header-loggedOut',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.header__logged--out') readonly rootClass = true;
  constructor() {}

  ngOnInit(): void {}
}
