import { Component, OnInit, inject } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';

@Component({
    selector: 'info-bar',
    templateUrl: 'info-bar.component.html',
    styleUrls: ['info-bar.component.scss'],
    standalone: false
})

export class InfoBarComponent implements OnInit {
	private amountsService = inject(AmountsService);

	public totals: any;
	public total = 0;

	ngOnInit() {
		this.totals = this.amountsService.totals.value;
		this.amountsService.totals.subscribe(data => {
			if (data) {
				this.totals = data;
				this.total = this.totals.fixed + this.totals.thrift + this.totals.stocks + this.totals.income;
			}
		});
		this.amountsService.updateTotals().subscribe();
	}
}
