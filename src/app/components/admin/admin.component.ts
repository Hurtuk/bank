import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ParserComponent } from './parser/parser.component';
import { UpdateComponent } from './update/update.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss'],
    imports: [FormsModule, ParserComponent, UpdateComponent, FontAwesomeModule]
})

export class AdminComponent {
	public currentTab = 'parser';

    faCog = faCog;
}