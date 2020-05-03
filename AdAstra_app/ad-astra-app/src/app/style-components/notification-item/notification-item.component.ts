import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'aa-notification-item',
	templateUrl: './notification-item.component.html',
	styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {
	@HostBinding('class.aa-notification-item') readonly rootClass = true;
	@HostBinding('class.-like') @Input() isLike: boolean = false;
	@HostBinding('class.-comment') @Input() isComment: boolean = false;
	@HostBinding('class.-follow') @Input() isFollow: boolean = false;
	@HostBinding('class.-new') @Input() isNew: boolean = false;
	@Input('postLink') public postLink: string;
	@Input('personName') public personName: string;
	@Input('time') public time: string;
	constructor() {}

	ngOnInit(): void {}

	setNewToFalse() {
		this.isNew = false;
	}
}
