import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'type',
    templateUrl: 'type.component.html',
    styleUrls: ['type.component.scss'],
    imports: []
})

export class TypeComponent implements OnInit {
	@Input() icon: any;
	@Input() size = '';

	constructor() { }

	public isString(value): boolean {
		return typeof value === 'string';
	}

	ngOnInit() { }
}