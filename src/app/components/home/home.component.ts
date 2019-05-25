import { Component, OnInit } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';

@Component({
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
	public fixAccounts: {bank: string, name: string, amount: number}[];
	public income: {date: Date, types: string[], title: string, amount: number}[];
	public thriftAccounts: {bank: string, name: string, amount: number}[];
	public stocks: {code: string, value: number, count: number}[];

	public chartData: any[];
	public chartOptions = [
		[{option: 'borderColor', value: '#00FF00'},
			{option: 'backgroundColor', value: '#00FF00'},
			{option: 'borderWidth', value: 1}],
		[{option: 'fill', value: false},
			{option: 'borderWidth', value: 1}],
		[{option: 'fill', value: false},
			{option: 'borderWidth', value: 2}],
		[{option: 'fill', value: false},
			{option: 'borderWidth', value: 2}]
	];

	constructor(
		private amountsService: AmountsService,
		private chartsService: ChartsService
	) { }

	ngOnInit() {
		this.amountsService.getHomeValues().subscribe(val => {
			if (val) {
				this.fixAccounts = val.fixed;
				this.income = val.income;
				this.thriftAccounts = val.thrift;
				this.stocks = val.stocks;
			}
		});
		this.amountsService.getTotalData().subscribe(val =>
			this.chartsService.totalData.next(
				[
					{
						label: 'Fixe',
						data: val.fixed.map(x => ({
							date: new Date(x.date),
							value: x.value
						}))
					},
					{
						label: 'A venir',
						data: val.income.map(x => ({
							date: new Date(x.date),
							value: -x.value
						}))
					},
					{
						label: 'Epargne',
						data: val.thrift.map(x => ({
							date: new Date(x.date),
							value: x.value
						}))
					},
					{
						label: 'Actions',
						data: val.variable.map(x => ({
							date: new Date(x.date),
							value: x.value
						}))
					}
				]
			)
		);
	}
}