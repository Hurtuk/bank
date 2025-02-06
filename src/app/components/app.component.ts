import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { InfoBarComponent } from './info-bar/info-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, MenuBarComponent, InfoBarComponent]
})
export class AppComponent {
	title = 'app';
}
