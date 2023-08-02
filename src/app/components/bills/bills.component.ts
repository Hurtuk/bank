import { Component, OnInit } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

    public data: any;

    constructor(
        private amountService: AmountsService
    ) { }

    ngOnInit(): void {
        this.data = this.amountService.getBills();
    }

}
