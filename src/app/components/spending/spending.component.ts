import { Component, OnInit } from '@angular/core';
import { TypesService } from '../../shared/services/types.service';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';
import { Subject } from '../../../../node_modules/rxjs';

@Component({
	selector: 'spending',
	templateUrl: 'spending.component.html',
	styleUrls: ['spending.component.scss']
})

export class SpendingComponent implements OnInit {
	public types: any[];
	public selectedTypes = [];
	public data = [];

	public groups: ['Comparaison', 'Addition'];
	public group: 'Comparaison';

	constructor(
		private typesService: TypesService,
		private amountsService: AmountsService,
		private chartsService: ChartsService
	) { }

	public isSelectedType(type, types = this.selectedTypes) {
		if (typeof types[0] === 'string') {
			return types.some(x => x === type.id);
		}
		return types.some(x => x.id === type.id);
	}

	public toggleType(type) {
		if (this.isSelectedType(type)) {
			const t = this.selectedTypes.find(x => x.id === type.id);
			const index = this.selectedTypes.indexOf(t);
			if (index !== -1) {
				this.selectedTypes.splice(index, 1);
			}
		} else {
			this.selectedTypes.push(type);
		}
		this.updateData();
	}

	private updateData() {
		const sentData = [];
		if (this.group = 'Comparaison') {
			for (const t of this.selectedTypes) {
				sentData.push({
					data: this.data.filter(d => this.isSelectedType(t, d.types)).map(d => ({date: new Date(d.date), value: Number.parseFloat(d.amount)})),
					label: t.tag
				});
			}
		}
		this.chartsService.typesChartData.next(sentData);
	}

	ngOnInit() {
		this.typesService.getTypes().subscribe(x => this.types = x);
		this.amountsService.getAllSpending().subscribe(x => this.data = x);
	}
}