import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';

@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.scss'],
    imports: [AsyncPipe]
})
export class BillsComponent implements OnInit {
    private amountService = inject(AmountsService);


    public data: any;

    ngOnInit(): void {
        this.data = this.amountService.getBills();
    }

}
