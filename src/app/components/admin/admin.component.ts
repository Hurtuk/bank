import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ParserComponent } from './parser/parser.component';
import { UpdateComponent } from './update/update.component';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss'],
    imports: [FormsModule, ParserComponent, UpdateComponent]
})

export class AdminComponent implements OnInit {
	public currentTab = 'parser';

	constructor() { }

	ngOnInit() { }
}