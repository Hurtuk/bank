import { Component } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';

@Component({
	selector: 'loans',
	templateUrl: 'loans.component.html',
	styleUrls: ['loans.component.scss']
})

export class LoansComponent {

    public loans = this.amountService.getLoans();
    public Math = Math;

    constructor(
        private amountService: AmountsService
    ) { }
}