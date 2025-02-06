import { Component, OnInit, inject } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';

@Component({
    selector: 'trade',
    templateUrl: 'trade.component.html',
    styleUrls: ['trade.component.scss'],
    standalone: false
})

export class TradeComponent implements OnInit {
	private amountsService = inject(AmountsService);
	private chartsService = inject(ChartsService);

	public currents: { actionCode: string, quantity: number, sumneg: number, sumpos: number, total: number, totalneg: number, totalpos: number, value: number, initial: number }[];

	ngOnInit() {
		this.chartsService.currentsData.subscribe(x => this.currents = x.sort((a1, a2) => a2.value * a2.quantity - a1.value * a1.quantity));
		this.amountsService.getCurrentsData()
			.subscribe(d => this.chartsService.currentsData.next(d));
	}

	public getActionIcon(actionCode: string): string {
		if (actionCode.includes(' ')) {
			return 'ETF';
		}
		return actionCode;
	}

	public floor(num: number): number {
		return Math.floor(num);
	}

	public decimal(num: number): string {
		const dec = Math.round((num - this.floor(num)) * 1000000) / 1000000;
		if (!dec) return '';
		return ',' + dec.toString().substring(2);
	}

	public sumInitial(): number {
		return this.currents ? this.currents.reduce((prev, cur) => prev += cur.initial, 0) : 0;
	}

	public sumValue(): number {
		return this.currents ? this.currents.reduce((prev, cur) => prev += cur.value * cur.quantity, 0) : 0;
	}
}