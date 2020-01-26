import { Component, OnInit, Input } from '@angular/core';
import { AmountsService } from '../../../shared/services/amounts.service';
import { TypesService } from '../../../shared/services/types.service';

@Component({
	selector: 'update-list',
	templateUrl: 'update-list.component.html',
	styleUrls: ['update-list.component.scss']
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
		updated?: boolean
	}[];
	@Input() account: number;
	@Input() canAdd: boolean;
	@Input() allIncome: boolean;
	public refundable: any[];
	public loans: any[];
	public popupOpened: boolean;
	public types: {id: number, image: string}[];
	public popupOpenedFor: any;
	public success: boolean;

	constructor(
		private amountsService: AmountsService,
		private typesService: TypesService
	) { }

	public removeRow(item) {
		this.items.splice(this.items.indexOf(item), 1);
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
		this.typesService.getTypes().subscribe(x => this.types = x);
		this.typesService.getTypes().subscribe();
	}
}