import { Component, OnInit, Input } from '@angular/core';
import { RealEstateService } from 'src/app/shared/services/real-estate.service';
import { TravelsService } from 'src/app/shared/services/travels.service';
import { AmountsService } from '../../../shared/services/amounts.service';
import { TypesService } from '../../../shared/services/types.service';
import { DatePipe } from '@angular/common';
import { TypeComponent } from '../../type/type.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'update-list',
    templateUrl: 'update-list.component.html',
    styleUrls: ['update-list.component.scss'],
    imports: [TypeComponent, FormsModule, DatePipe]
})

export class UpdateListComponent implements OnInit {
	@Input() items: {
		id: number,
		types: any[],
		date: Date,
		title: string,
		amount: number,
		variable: number,
		refunding: number,
		loan: number,
		profitability: boolean,
		travel: number,
		updated?: boolean
	}[];
	@Input() account: number;
	@Input() canAdd: boolean;
	@Input() allIncome: boolean;
	@Input() addAllowed = true;
	@Input() filterTag: number;
	public refundable: any[];
	public loans: any[];
	public travels: any[];
	public popupOpened: boolean;
	public types: {id: number, image: string}[];
	public popupOpenedFor: any;
	public success: boolean;

	public refundDisplayIds: number[] = [];

	public lastMonthly: any[];
	public loanMonth: any[];

	constructor(
		private amountsService: AmountsService,
		private typesService: TypesService,
		private travelsService: TravelsService,
		private realEstateService: RealEstateService
	) { }

	public removeRow(item) {
		this.items.splice(this.items.indexOf(item), 1);
	}

	public show(item): boolean {
		return !this.filterTag || item.types.some(t => t.id == this.filterTag);
	}

	public openPopup(item) {
		this.popupOpenedFor = item;
		this.popupOpened = true;
	}

	public closePopup() {
		this.popupOpenedFor = null;
		this.popupOpened = false;
	}

	public currentHasType(type) {
		return this.popupOpenedFor.types.some(x => parseInt(x.id) === type.id);
	}

	public add() {
		if (!this.items) {
			this.items = [];
		}
		this.items.unshift({
			id: -1,
			types: [],
			date: null,
			title: '',
			amount: 0,
			variable: 0,
			refunding: null,
			loan: null,
			profitability: false,
			travel: null,
			updated: true
		});
	}

	public save() {
		this.amountsService.save(this.account, this.items.filter(x => x.updated).reverse())
			.subscribe(x => {
				this.amountsService.updateTotals();
				this.success = true;
				this.items = this.items.filter(d => d.updated);
				this.items.forEach(d => d.updated = false);
			});
	}

	public invert(row) {
		const variable = row.variable;
		row.variable = row.amount;
		row.amount = variable;
		row.updated = true;
	}

	public autoSetData(item) {
		this.typesService.getTypesFromTransacTitle(item.title).subscribe(types => {
			if (types && types.length > 0) {
				item.types = [];
				types.forEach(type => {
					item.types.push(this.types.find(t => t.id == type))
				});
			}
		});
	}

	public autofill(item) {
		this.amountsService.getAutodata(item).subscribe(data => {
			if (data) {
				item.loan = data.loan;
				item.profitability = data.profitability;
			}
		});
	}

	public toggleType(type) {
		this.popupOpenedFor.updated = true;
		if (this.currentHasType(type)) {
			const t = this.popupOpenedFor.types.find(x => parseInt(x.id) === type.id);
			const index = this.popupOpenedFor.types.indexOf(t);
			if (index !== -1) {
				this.popupOpenedFor.types.splice(index, 1);
			}
		} else {
			this.popupOpenedFor.types.push(type);
		}
	}

	public addLoan(lm: any) {
		if (!this.items) {
			this.items = [];
		}
		this.items.push({
			id: -1,
			types: this.types.filter(t => t.id == 4 || t.id == 26 || t.id == lm.relatedTag),
			date: new Date(lm.date),
			title: 'Prêt',
			amount: -lm.capital,
			variable: 0,
			refunding: null,
			loan: lm.idLoan,
			profitability: false,
			travel: null,
			updated: true
		},{
			id: -1,
			types: this.types.filter(t => t.id == 4 || t.id == 26 || t.id == lm.relatedTag),
			date: new Date(lm.date),
			title: 'Intérêts prêt',
			amount: -lm.interests,
			variable: 0,
			refunding: null,
			loan: lm.idLoan,
			profitability: true,
			travel: null,
			updated: true
		},{
			id: -1,
			types: this.types.filter(t => t.id == 4 || t.id == 26 || t.id == lm.relatedTag),
			date: new Date(lm.date),
			title: 'Assurance prêt',
			amount: -lm.tools,
			variable: 0,
			refunding: null,
			loan: null,
			profitability: true,
			travel: null,
			updated: true
		});
	}

	ngOnInit() {
		if (this.allIncome) {
			this.amountsService.getAllVariables().subscribe(x => {
				this.refundable = x;
			});
		} else {
			this.amountsService.getHomeValues().subscribe(x => {
				this.refundable = x.income;
			});
		}
		this.amountsService.getLoans().subscribe(x => {
			this.loans = x;
		});
		this.travelsService.getTravels().subscribe(x => {
			this.travels = x;
		});
		if (this.canAdd) {
			this.realEstateService.getLoanMonth().subscribe(d => this.loanMonth = d);
		}
		this.typesService.getTypes().subscribe(x => this.types = x);
		this.typesService.getTypes().subscribe();
	}
}