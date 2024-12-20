import { Component, inject } from '@angular/core';
import { OptionsService } from 'src/app/shared/services/options.service';

@Component({
	selector: 'menu-bar',
	templateUrl: 'menu-bar.component.html',
	styleUrls: ['menu-bar.component.scss']
})

export class MenuBarComponent {
	private optionsService = inject(OptionsService);

	public options$ = this.optionsService.getOptions();
}