import { Component } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent {

    public data = this.amountService.getBills();

    constructor(
        private amountService: AmountsService
    ) { }

}
