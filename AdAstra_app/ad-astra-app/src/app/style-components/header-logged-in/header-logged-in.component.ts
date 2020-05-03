import { Component, OnInit, HostBinding, Renderer2 } from '@angular/core';

@Component({
	selector: 'aa-header-loggedIn',
	templateUrl: './header-logged-in.component.html',
	styleUrls: ['./header-logged-in.component.scss'],
})
export class HeaderLoggedInComponent implements OnInit {
	@HostBinding('class.header__logged--in') readonly rootClass = true;
	isOpen: boolean = false;
	constructor() {}

	ngOnInit(): void {}

	handleNotification() {
		this.isOpen = !this.isOpen;
	}
}
