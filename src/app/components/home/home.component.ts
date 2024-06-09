import { Component, OnInit } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';

@Component({
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {

	private YEARS_BACK = 3;

	public fixAccounts: {bank: string, name: string, amount: number}[];
	public income: {date: Date, types: string[], title: string, amount: number}[];
	public thriftAccounts: {bank: string, name: string, amount: number}[];
	public stocks: {code: string, value: number, count: number}[];

	public chartOptions = [
		[{option: 'borderColor', value: '#437EFF'},
			{option: 'backgroundColor', value: '#437EFF'},
			{option: 'borderWidth', value: 1}],
		[{option: 'fill', value: false},
			{option: 'borderWidth', value: 1}],
		[{option: 'fill', value: false},
			{option: 'borderWidth', value: 2}],
		[{option: 'fill', value: false},
			{option: 'borderWidth', value: 2}]
	];

	public minDate: Date;

	constructor(
		private amountsService: AmountsService,
		private chartsService: ChartsService
	) { }

	ngOnInit() {
		const today = new Date();
		this.minDate = new Date(today.getFullYear() - this.YEARS_BACK, today.getMonth(), today.getDate());
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
					{ label: 'Fixe', data: val.fixed },
					{ label: 'A venir', data: val.income.map(i => ({date: i.date, value: -i.value})) },
					{ label: 'Epargne', data: val.thrift },
					{ label: 'Actions', data: val.variable }
				]
			)
		);
	}
	
	public getActionIcon(actionCode: string): string {
		if (actionCode.includes(' ')) {
			return 'ETF';
		}
		return actionCode;
	}
}