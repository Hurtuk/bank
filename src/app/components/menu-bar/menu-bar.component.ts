import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OptionsService } from 'src/app/shared/services/options.service';
import { faHome, faCreditCard, faCalendarMinus, faCalendarPlus, faUniversity, faMoneyBill, faGlobe, faSuitcase, faBuilding, faFileText, faPlug, faPlane, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'menu-bar',
    templateUrl: 'menu-bar.component.html',
    styleUrls: ['menu-bar.component.scss'],
    imports: [AsyncPipe, RouterLink, FontAwesomeModule]
})

export class MenuBarComponent {
	private optionsService = inject(OptionsService);

    faHome = faHome;
    faCreditCard = faCreditCard;
    faCalendarMinus = faCalendarMinus;
    faCalendarPlus = faCalendarPlus;
    faUniversity = faUniversity;
    faMoneyBill = faMoneyBill;
    faGlobe = faGlobe;
    faSuitcase = faSuitcase;
    faBuilding = faBuilding;
    faFileText = faFileText;
    faPlug = faPlug;
    faPlane = faPlane;
    faCog = faCog;

	public options$ = this.optionsService.getOptions();
}