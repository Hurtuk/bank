import { Component, OnInit, inject } from '@angular/core';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';
import { BkChartComponent } from '../bk-chart/bk-chart.component';
import { DatePipe, PercentPipe } from '@angular/common';
import { AmountDirective } from 'src/app/shared/directives/amount.directive';
import { TypeComponent } from '../type/type.component';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
	imports: [BkChartComponent, DatePipe, PercentPipe, AmountDirective, TypeComponent]
})

export class HomeComponent implements OnInit {
	private amountsService = inject(AmountsService);
	private chartsService = inject(ChartsService);

	private YEARS_BACK = 3;

	public fixAccounts: {bank: string, name: string, amount: number}[];
	public income: {date: Date, types: string[], title: string, amount: number}[];
	public thriftAccounts: {bank: string, name: string, amount: number}[];
	public stockThriftAccounts: {bank: string, name: string, amount: number}[];
	public stocks: {code: string, value: number, count: number}[];

	public chartOptions = [
		[{option: 'borderColor', value: '#437EFF'},
			{option: 'backgroundColor', value: '#437EFF'},
			{option: 'borderWidth', value: 1}],
		[{option: 'borderColor', value: '#5FB5EF'},
			{option: 'backgroundColor', value: '#5FB5EF'},
			{option: 'fill', value: false},
			{option: 'borderWidth', value: 1}],
		[{option: 'borderColor', value: '#baddf5'},
			{option: 'backgroundColor', value: '#baddf5'},
			{option: 'borderWidth', value: 2}],
		[{option: 'borderColor', value: '#FFCE56'},
			{option: 'backgroundColor', value: '#FFCE56'},
			{option: 'fill', value: false},
			{option: 'borderWidth', value: 2}],
		[{option: 'fill', value: false},
			{option: 'borderWidth', value: 2}]
	];

	public minDate: Date;

	ngOnInit() {
		const today = new Date();
		this.minDate = new Date(today.getFullYear() - this.YEARS_BACK, today.getMonth(), today.getDate());
		this.amountsService.getHomeValues().subscribe(val => {
			if (val) {
				this.fixAccounts = val.fixed;
				this.income = val.income;
				this.thriftAccounts = val.thrift;
				this.stockThriftAccounts = val.stockThrift;
				this.stocks = val.stocks;
			}
		});
		this.amountsService.getTotalData().subscribe(val =>
			this.chartsService.totalData.next(
				[
					{ label: 'Fixe', data: val.fixed },
					{ label: 'A venir', data: val.income.map(i => ({date: i.date, value: -i.value})) },
					{ label: 'Sécurité', data: val.thrift },
					{ label: 'Epargne', data: val.variableEpargne },
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