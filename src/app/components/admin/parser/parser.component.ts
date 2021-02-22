import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../shared/services/accounts.service';

@Component({
	selector: 'parser',
	templateUrl: 'parser.component.html',
	styleUrls: ['parser.component.scss']
})

export class ParserComponent implements OnInit {
	public parsingText: string;
	public result: {
		id: number,
		types: string[],
		date: Date,
		title: string,
		amount: number,
		variable: number,
		refunding: number,
		loan: number,
		updated: boolean
	}[];
	public accounts: {id: number, name: string, bank: string}[] = [];
	public account: {id: number, name: string};
	public lastItems: {date: Date, title: string}[];

	constructor(
		private accountsService: AccountsService
	) { }

	ngOnInit() {
		this.accountsService.getAccounts().subscribe(x => this.accounts = x);
		this.accountsService.getLastItems().subscribe(x => this.lastItems = x);
	}

	public parse() {
		this.result = [];
		const rows = this.parsingText.split('\n');
		let date: Date,
			title: string,
			amount: string;
		let data: string[], dateData: string[];
		for (const r of rows) {
			data = r.split('\t');
			if (r.indexOf('/') !== -1) {
				// Date
				dateData = data[0].split('/');
				date = new Date(Number.parseInt(dateData[2]), Number.parseInt(dateData[1]) - 1, Number.parseInt(dateData[0]), 9, 30, 0);
				// Title
				title = data[1];
			}
			if (r.indexOf('€') !== -1) {
				// Amount
				amount = data[1].split('€')[0].trim().replace(/,/, '.').replace(/ /, '');
				// Add line
				this.result.push({
					id: -1,
					types: [],
					date: date,
					title: title.toLowerCase(),
					amount: Number.parseFloat(amount),
					variable: 0,
					refunding: null,
					loan: null,
					updated: true
				});
			}
		}
	}
}