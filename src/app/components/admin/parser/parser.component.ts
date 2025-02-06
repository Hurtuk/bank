import { Component, OnInit, inject } from '@angular/core';
import { AccountsService } from '../../../shared/services/accounts.service';
import { AmountsService } from 'src/app/shared/services/amounts.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateListComponent } from '../update-list/update-list.component';

@Component({
    selector: 'parser',
    templateUrl: 'parser.component.html',
    styleUrls: ['parser.component.scss'],
    imports: [FormsModule, UpdateListComponent, DatePipe]
})

export class ParserComponent implements OnInit {
	private accountsService = inject(AccountsService);
	private amountsService = inject(AmountsService);

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
	public accounts: {id: number, name: string, bank: string, thrift: boolean}[] = [];
	public account: {id: number, name: string};
	public lastItems: {date: Date, title: string}[];

	public transferDate: Date;
	public transferAmount: number;
	public transferFromAccount: {id: number, name: string};;
	public transferToAccount: {id: number, name: string};
	public transferSaved = false;

	ngOnInit() {
		this.accountsService.getAccounts().subscribe(x => this.accounts = x);
		this.accountsService.getLastItems().subscribe(x => this.lastItems = x);
	}

	public saveTransfer() {
		this.amountsService.transfer(this.transferDate, this.transferAmount, this.transferFromAccount.id, this.transferToAccount.id)
			.subscribe(() => {
				this.transferSaved = true;
				setTimeout(() => this.transferSaved = false, 2000);
			});
	}

	public parse() {
		this.result = [];
		const rows = this.parsingText.split('\n');
		let date: Date,
			title: string,
			amount: string;
		let data: string[], dateData: string[];
		for (const r of rows) {
			if (r) {
				data = r.split('\t');
				// Date
				dateData = data[0].split('/');
				date = new Date(Number.parseInt(dateData[2]), Number.parseInt(dateData[1]) - 1, Number.parseInt(dateData[0]), 9, 30, 0);
				// Title
				title = data[1];
				// Amount
				const indexAmount = data[2].trim() ? 2 : 3;
				amount = data[indexAmount].split('€')[0].trim().replace(/,/, '.').replace(/\+? /g, '');
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

	public getAccounts(thrift: boolean): {id: number, name: string, bank: string, thrift: boolean}[] {
		return this.accounts.filter(a => a.thrift == thrift);
	}
}