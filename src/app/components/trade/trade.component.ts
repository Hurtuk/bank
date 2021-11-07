import { Component, OnInit } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';

@Component({
	selector: 'trade',
	templateUrl: 'trade.component.html',
	styleUrls: ['trade.component.scss']
})

export class TradeComponent implements OnInit {
	public currents: { actionCode: string, quantity: number, sumneg: number, sumpos: number, total: number, totalneg: number, totalpos: number, value: number }[];
	public bought: {
		action: string;
		date: Date;
		value: number;
		count: number;
		total?: number;
	}[];
	public benefit: {action: string, total: number, value: number}[];
	public benefitTotal: number;
	public percent: number;

	constructor(
		private amountsService: AmountsService,
		private chartsService: ChartsService
	) { }

	ngOnInit() {
		this.chartsService.currentsData.subscribe(x => this.currents = x);
		this.amountsService.getBenefit().subscribe(d =>
			this.chartsService.benefitData.next([{
				label: 'Bénéfice',
				data: d.map(dd => ({date: new Date(dd.date), value: dd.value}))
			}])
		);
		this.amountsService.getCurrentsData()
			.subscribe(d => this.chartsService.currentsData.next(d));
	}

	public getPercent(prev: number, cur: number) {
		return cur - prev === 0 ? 0 : (cur * 100 / prev) - 100;
	}
}