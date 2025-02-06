import { Component, OnInit } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';

@Component({
    selector: 'loans',
    templateUrl: 'loans.component.html',
    styleUrls: ['loans.component.scss'],
    standalone: false
})

export class LoansComponent implements OnInit {

    public loans: any;
    public Math = Math;

    constructor(
        private amountService: AmountsService
    ) { }

    ngOnInit(): void {
        this.loans = this.amountService.getLoans();
    }
}