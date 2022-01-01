import { Component, OnInit } from '@angular/core';
import { TypesService } from 'src/app/shared/services/types.service';
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
	public types: {id: number, tag: string}[];
	public year: number;
	public years: string[];

	constructor(
		private accountsService: AccountsService,
		private amountsService: AmountsService,
		private typesService: TypesService
	) { }

	ngOnInit() {
		this.accountsService.getAllAccounts().subscribe(x => this.accounts = x);
		this.typesService.getTypes().subscribe(x => this.types = x.sort((a, b) => a.tag.localeCompare(b.tag)));
	}

	public updateYears() {
		this.year = 0;
		this.accountsService.getAccountYears(this.account.id).subscribe(x => this.years = x);
		this.result = [];
	}

	public updateContent() {
		this.amountsService.getTransactionsByAccountAndYear(this.account.id, this.year).subscribe(x => this.result = x);
	}
}