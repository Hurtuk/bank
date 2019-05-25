import { Component, OnInit } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
	selector: 'trade',
	templateUrl: 'trade.component.html',
	styleUrls: ['trade.component.scss']
})

export class TradeComponent implements OnInit {
	private currents: any[];
	private bought: any[];
	private benefit: any[];
	private benefitTotal: number;
	private percent: number;

	constructor(
		private amountsService: AmountsService,
		private chartsService: ChartsService
	) { }

	ngOnInit() {
		this.chartsService.currentsData.subscribe(x => this.currents = x.map(d =>
			({
				action: d.label,
				valueDate: d.data[d.data.length - 1],
				prevValueDate: d.data[d.data.length - 2]
			})
		));
		this.amountsService.getBenefit().subscribe(d =>
			this.chartsService.benefitData.next([{
				label: 'Bénéfice',
				data: d.map(dd => ({date: new Date(dd.date), value: dd.value}))
			}])
		);
		Observable.forkJoin([
			this.amountsService.getCurrentsData(),
			this.amountsService.getBoughtActions()
		]).subscribe(d => {
			this.chartsService.currentsData.next(d[0].map(x => ({
				label: x.label,
				data: x.data.map(dd => ({date: new Date(dd.date), value: dd.value}))
			})));
			this.bought = d[1];
			this.bought.forEach((b, index) =>
				b.total = Number.parseInt(b.count) + (index ? Number.parseInt(this.bought[index - 1].total) : 0)
			);
			this.benefit = this.currents.map(a => ({
				action: a.action,
				total: this.bought.reduce((prev, current) => prev += Number.parseFloat(current.value), 0),
				value: this.bought[this.bought.length - 1].total * this.currents[this.currents.length - 1].valueDate.value
			}));
			this.benefitTotal = this.benefit.reduce((prev, current) => prev += (current.value - current.total), 0);
		});
	}

	public getPercent(prev: number, cur: number) {
		return cur - prev === 0 ? 0 : (cur * 100 / prev) - 100;
	}
}