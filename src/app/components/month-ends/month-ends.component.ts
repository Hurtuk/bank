import { Component, OnInit } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';
import { DateService } from '../../shared/services/date.service';

@Component({
	selector: 'month-ends',
	templateUrl: 'month-ends.component.html',
	styleUrls: ['month-ends.component.scss']
})

export class MonthEndsComponent implements OnInit {
	public data: {year: string, total?: number, average?: number, months: {month: number, value: number}[]}[];
	public operation = 'Total';

	constructor(
		private amountsService: AmountsService,
		private chartsService: ChartsService,
		private dateService: DateService
	) { }

	public refresh() {
		switch (this.operation) {
			case 'Total':
				this.chartsService.monthEndsData.next([{
					label: 'Fins de mois',
					data: this.data.reduce((prev, current) => prev.concat(current.months.map(m => ({date: new Date(parseInt(current.year), m.month - 1, 1), value: m.value}))), [])
				}]);
				break;
			case 'Superposés':
				this.chartsService.monthEndsData.next(
					this.data.map(d => ({
						label: d.year,
						data: d.months.map(m => ({date: new Date(parseInt(d.year), m.month - 1, 1), value: m.value}))
					}))
				);
				break;
		}
	}

	public getMonth(month: number): string {
		return this.dateService.months[month - 1];
	}

	ngOnInit() {
		this.amountsService.getMonthEnds().subscribe(x => {
			this.data = x;
			this.data.forEach(d => {
				d.total = d.months.reduce((prev, current) => prev + current.value, 0);
				d.average = d.total / d.months.length;
			});
			this.refresh();
		});
	}
}