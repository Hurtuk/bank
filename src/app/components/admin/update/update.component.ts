import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../shared/services/accounts.service';
import { AmountsService } from '../../../shared/services/amounts.service';

@Component({
	selector: 'update',
	templateUrl: 'update.component.html',
	styleUrls: ['update.component.scss']
})

export class UpdateComponent implements OnInit {
	public result: {
		id: number,
		types: {image: string, id: number, name: string}[],
		date: Date,
		title: string,
		amount: number,
		variable: number,
		refunding: number,
		updated?: boolean
	}[];
	public accounts: {id: number, name: string}[] = [];
	public account: {id: number, name: string};
	public year = (new Date()).getFullYear();
	public years: string[];

	constructor(
		private accountsService: AccountsService,
		private amountsService: AmountsService
	) { }

	ngOnInit() {
		this.accountsService.getAllAccounts().subscribe(x => this.accounts = x);
	}

	public updateYears() {
		this.accountsService.getAccountYears(this.account.id).subscribe(x => this.years = x);
		this.result = [];
	}

	public updateContent() {
		this.amountsService.getTransactionsByAccountAndYear(this.account.id, this.year).subscribe(x => this.result = x);
	}
}