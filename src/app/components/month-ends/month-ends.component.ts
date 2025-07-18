import { Component, OnInit, inject } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';
import { DateService } from '../../shared/services/date.service';
import { BkChartComponent } from '../bk-chart/bk-chart.component';
import { FormsModule } from '@angular/forms';
import { AmountDirective } from 'src/app/shared/directives/amount.directive';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'month-ends',
    templateUrl: 'month-ends.component.html',
    styleUrls: ['month-ends.component.scss'],
	imports: [BkChartComponent, FormsModule, AmountDirective, FontAwesomeModule],
})

export class MonthEndsComponent implements OnInit {
	private amountsService = inject(AmountsService);
	private chartsService = inject(ChartsService);
	private dateService = inject(DateService);

	public RANGE = 12000;

	public data: {year: string, total?: number, average?: number, months: {month: number, value: number}[]}[];
	public tableData: {year: string, total?: number, average?: number, months: {month: number, value: number}[]}[];
	public operation = 'Total';

	public minYear = (new Date()).getFullYear() - 5;

	faCalendarPlus = faCalendarPlus;

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
			this.tableData = [...this.data].reverse();
			this.refresh();
		});
		this.amountsService.getPlusMinus().subscribe(x => {
			this.chartsService.rangesDataP.next([{
				label: "Plus",
				data: x.map(m => ({date: new Date(parseInt(m.year), m.month - 1, 1), value: m.plus }))
			}]);
			this.chartsService.rangesDataM.next([{
				label: "Moins",
				data: x.map(m => ({date: new Date(parseInt(m.year), m.month - 1, 1), value: m.minus }))
			}]);
		});
	}
}