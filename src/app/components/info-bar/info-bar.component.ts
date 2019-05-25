import { Component, OnInit } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';

@Component({
	selector: 'info-bar',
	templateUrl: 'info-bar.component.html',
	styleUrls: ['info-bar.component.scss']
})

export class InfoBarComponent implements OnInit {
	public totals = {
		fixed: 0,
		income: 0,
		thrift: 0,
		stocks: 0
	};
	public total = 0;

	constructor(
		private amountsService: AmountsService
	) { }

	ngOnInit() {
		this.amountsService.totals.subscribe(data => {
			if (data) {
				this.totals.fixed = parseFloat(data.fixed);
				this.totals.income = parseFloat(data.income);
				this.totals.thrift = parseFloat(data.thrift);
				this.totals.stocks = parseFloat(data.stocks);
				this.total = this.totals.fixed + this.totals.thrift + this.totals.stocks + this.totals.income;
			}
		});
		this.amountsService.updateTotals().subscribe();
	}
}
