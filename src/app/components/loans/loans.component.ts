import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AmountDirective } from 'src/app/shared/directives/amount.directive';
import { AmountsService } from 'src/app/shared/services/amounts.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
    selector: 'loans',
    templateUrl: 'loans.component.html',
    styleUrls: ['loans.component.scss'],
    imports: [AsyncPipe, AmountDirective, ProgressBarComponent]
})

export class LoansComponent implements OnInit {
    private amountService = inject(AmountsService);


    public loans: any;
    public Math = Math;

    ngOnInit(): void {
        this.loans = this.amountService.getLoans();
    }
}