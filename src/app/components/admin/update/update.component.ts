import { Component, OnInit, inject } from '@angular/core';
import { TypesService } from 'src/app/shared/services/types.service';
import { AccountsService } from '../../../shared/services/accounts.service';
import { AmountsService } from '../../../shared/services/amounts.service';

import { FormsModule } from '@angular/forms';
import { UpdateListComponent } from '../update-list/update-list.component';

@Component({
    selector: 'update',
    templateUrl: 'update.component.html',
    styleUrls: ['update.component.scss'],
    imports: [FormsModule, UpdateListComponent]
})

export class UpdateComponent implements OnInit {
	private accountsService = inject(AccountsService);
	private amountsService = inject(AmountsService);
	private typesService = inject(TypesService);

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