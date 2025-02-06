import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';

@Component({
    selector: 'loans',
    templateUrl: 'loans.component.html',
    styleUrls: ['loans.component.scss'],
    imports: [AsyncPipe]
})

export class LoansComponent implements OnInit {
    private amountService = inject(AmountsService);


    public loans: any;
    public Math = Math;

    ngOnInit(): void {
        this.loans = this.amountService.getLoans();
    }
}