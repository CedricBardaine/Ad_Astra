import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
	selector: 'aa-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	isConnected: boolean = false ;
	constructor(private auth: AuthService) {}

	ngOnInit(): void {}
}
