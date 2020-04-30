import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'aa-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	@HostBinding('class.btn') readonly rootClass = true;
	@HostBinding('class.btn--secondary') @Input() isSecondary: boolean = false;
	@HostBinding('class.btn--large') @Input() isLarge: boolean = false;
	@HostBinding('class.btn--disabled') @Input() isDisabled: boolean = false;
	@Input('btnText') public btnText: string;
	@Input('btnLink') public btnLink: string;
	constructor() {}

	ngOnInit(): void {}
}
