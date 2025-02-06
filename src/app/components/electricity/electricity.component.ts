import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/shared/services/charts.service';
import { DateService } from 'src/app/shared/services/date.service';
import { ElectricityService } from 'src/app/shared/services/electricity.service';

@Component({
    selector: 'app-electricity',
    templateUrl: './electricity.component.html',
    styleUrls: ['./electricity.component.scss'],
    standalone: false
})
export class ElectricityComponent implements OnInit {

	public data: any;
	public years: any[];

	public Math = Math;

	public chartOptions = [
		[{ option: 'borderColor', value: '#ffd21c' },
		{ option: 'backgroundColor', value: '#ffe787' },
		{ option: 'borderWidth', value: 1 }]
	];

	private today = new Date();

	constructor(
		private chartsService: ChartsService,
		private electricityService: ElectricityService,
		private dateService: DateService
	) { }

	ngOnInit() {
		this.electricityService.getElecData().subscribe(x => {
			this.data = x.data;
			this.years = Object.entries(x.years).map(([k, v]: [any, any]) => ({ year: k.substring(1), ...v }));
			this.chartsService.elecData.next([{ label: 'Relevés Linky', data: Object.entries(this.data).map(([k, v]) => ({ date: new Date(k), value: v as number })) }]);
		});
	}

	public getMinimum(year: string): string {
		let min = Infinity;
		let month = 0;
		for (let y in this.data) {
			if (y.substring(0, 4) === year) {
				const m = parseInt(y.substring(5, 7));
				if (this.data[y] < min && !this.thisMonth(parseInt(year), m)) {
					min = this.data[y];
					month = m;
				}
			}
		}
		return this.Math.ceil(min) + '<br/>' + this.dateService.months[month - 1];
	}

	public getMaximum(year: string): string {
		let max = 0;
		let month = 0;
		for (let y in this.data) {
			if (y.substring(0, 4) === year) {
				const m = parseInt(y.substring(5, 7));
				if (this.data[y] > max && !this.thisMonth(parseInt(year), m)) {
					max = this.data[y];
					month = m;
				}
			}
		}
		return this.Math.ceil(max) + '<br/>' + this.dateService.months[month - 1];
	}

	private thisMonth(year: number, month: number): boolean {
		return this.today.getFullYear() === year && (this.today.getMonth() + 1) === month;
	}

}
