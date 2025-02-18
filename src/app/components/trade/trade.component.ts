import { Component, OnInit, inject } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';
import { PercentPipe } from '@angular/common';
import { AmountDirective } from 'src/app/shared/directives/amount.directive';

@Component({
    selector: 'trade',
    templateUrl: 'trade.component.html',
    styleUrls: ['trade.component.scss'],
	imports: [PercentPipe, AmountDirective]
})

export class TradeComponent implements OnInit {
	private amountsService = inject(AmountsService);
	private chartsService = inject(ChartsService);

	public currents: { actionCode: string, quantity: number, sumneg: number, sumpos: number, total: number, totalneg: number, totalpos: number, value: number, initial: number }[];

	public bestPerfs = { today: [],	week: [], month: []	};
	public worstPerfs = { today: [], week: [], month: [] };
	private MAX_PERF_TO_SHOW = 6;

	ngOnInit() {
		this.chartsService.currentsData.subscribe(x => this.currents = x.sort((a1, a2) => a2.value * a2.quantity - a1.value * a1.quantity));
		this.amountsService.getCurrentsData()
			.subscribe(d => this.chartsService.currentsData.next(d));
		this.amountsService.getPerfs()
			.subscribe(perfs => {
				perfs = perfs.filter(p => !!p.d1).sort((a, b) => (b.value / b.d1) - (a.value / a.d1));
				this.bestPerfs.today = perfs.slice(0, this.MAX_PERF_TO_SHOW).map(p => ({ actionCode: p.code, value: p.value, perf: p.value / p.d1 - 1 }));
				this.worstPerfs.today = perfs.slice(-this.MAX_PERF_TO_SHOW).reverse().map(p => ({ actionCode: p.code, value: p.value, perf: p.value / p.d1 - 1 }));
				perfs = perfs.filter(p => !!p.d7).sort((a, b) => (b.value / b.d7) - (a.value / a.d7));
				this.bestPerfs.week = perfs.slice(0, this.MAX_PERF_TO_SHOW).map(p => ({ actionCode: p.code, value: p.value, perf: p.value / p.d7 - 1 }));
				this.worstPerfs.week = perfs.slice(-this.MAX_PERF_TO_SHOW).reverse().map(p => ({ actionCode: p.code, value: p.value, perf: p.value / p.d7 - 1 }));
				perfs = perfs.filter(p => !!p.d30).sort((a, b) => (b.value / b.d30) - (a.value / a.d30));
				this.bestPerfs.month = perfs.slice(0, this.MAX_PERF_TO_SHOW).map(p => ({ actionCode: p.code, value: p.value, perf: p.value / p.d30 - 1 }));
				this.worstPerfs.month = perfs.slice(-this.MAX_PERF_TO_SHOW).reverse().map(p => ({ actionCode: p.code, value: p.value, perf: p.value / p.d30 - 1 }));
			});
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