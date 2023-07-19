import { Component } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent {

    public data = this.amountService.getBills();
    public Math = Math;
    public currentYear = (new Date).getFullYear();

    constructor(
        private amountService: AmountsService
    ) { }

    public getYears(): number[] {
        return Array.from({length: this.currentYear - 2017 + 1}, (_, i) => this.currentYear - i);
    }

}
