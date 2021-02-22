import { Component, OnInit } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'trade',
	templateUrl: 'trade.component.html',
	styleUrls: ['trade.component.scss']
})

export class TradeComponent implements OnInit {
	public currents: { action: string, valueDate: { value: number, date: Date }, prevValueDate: { value: number, date: Date } }[];
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
		this.chartsService.currentsData.subscribe(x => this.currents = x.map(d =>
			({
				action: d.label,
				valueDate: d.data[d.data.length - 1],
				prevValueDate: d.data[d.data.length - 2] ? d.data[d.data.length - 2] : null
			})
		));
		this.amountsService.getBenefit().subscribe(d =>
			this.chartsService.benefitData.next([{
				label: 'Bénéfice',
				data: d.map(dd => ({date: new Date(dd.date), value: dd.value}))
			}])
		);
		forkJoin([
			this.amountsService.getCurrentsData(),
			this.amountsService.getBoughtActions()
		]).subscribe(d => {
			this.chartsService.currentsData.next(d[0].map(x => ({
				label: x.label,
				data: x.data.map(dd => ({date: new Date(dd.date), value: dd.value}))
			})));
			this.bought = d[1];
			this.bought.forEach((b, index) =>
				b.total = b.count + (index ? this.bought[index - 1].total : 0)
			);
			this.benefit = this.currents.map(a => ({
				action: a.action,
				total: this.bought.reduce((prev, current) => prev += current.value, 0),
				value: this.bought[this.bought.length - 1].total * this.currents[this.currents.length - 1].valueDate.value
			}));
			this.benefitTotal = this.benefit.reduce((prev, current) => prev += (current.value - current.total), 0);
		});
	}

	public getPercent(prev: number, cur: number) {
		return cur - prev === 0 ? 0 : (cur * 100 / prev) - 100;
	}
}