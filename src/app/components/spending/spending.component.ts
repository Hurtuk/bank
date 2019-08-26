import { Component, OnInit } from '@angular/core';
import { TypesService } from '../../shared/services/types.service';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';

@Component({
	selector: 'spending',
	templateUrl: 'spending.component.html',
	styleUrls: ['spending.component.scss']
})

export class SpendingComponent implements OnInit {
	public types: { id: number; tag: string; image: string; total: number; }[];
	public selectedTypes: { id: number; tag?: string; image?: string; total?: number; }[] = [];
	public data: { date: Date; amount: number; types: string[]; }[] = [];

	public groups = ['Comparaison', 'Addition'];
	public group = 'Comparaison';

	constructor(
		private typesService: TypesService,
		private amountsService: AmountsService,
		private chartsService: ChartsService
	) { }

	public isSelectedType(type, types = this.selectedTypes) {
		console.log(type, types);
		return types.some(x => x.id === type.id);
	}

	public toggleType(type) {
		if (this.isSelectedType(type)) {
			const index = this.selectedTypes.findIndex(x => x.id === type.id);
			if (index !== -1) {
				this.selectedTypes.splice(index, 1);
			}
		} else {
			this.selectedTypes.push(type);
		}
		this.updateData();
	}

	private updateData() {
		const sentData: {label: string, data: {date: Date, value: number}[]}[] = [];
		if (this.group === 'Comparaison') {
			for (const t of this.selectedTypes) {
				sentData.push({
					data: this.data
						.filter(d => this.isSelectedType(t, d.types.map(ty => ({id: parseInt(ty)}))))
						.map(d => ({date: d.date, value: d.amount})),
					label: t.tag
				});
				console.log(sentData);
			}
		}
		this.chartsService.typesChartData.next(sentData);
	}

	ngOnInit() {
		this.typesService.getTypes().subscribe(x => this.types = x);
		this.amountsService.getAllSpending().subscribe(x => this.data = x);
	}
}