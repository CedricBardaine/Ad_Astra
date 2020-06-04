import { Component, OnInit, HostBinding, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
	selector: 'aa-header-loggedIn',
	templateUrl: './header-logged-in.component.html',
	styleUrls: ['./header-logged-in.component.scss'],
})
export class HeaderLoggedInComponent implements OnInit {
	@HostBinding('class.header__logged--in') readonly rootClass = true;
	isOpen: boolean = false;
	constructor(private auth: AuthService) {}

	ngOnInit(): void {}

	handleNotification() {
		this.isOpen = !this.isOpen;
	}

	logout() { this.auth.logOutUser(); }

}
