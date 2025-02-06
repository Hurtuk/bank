import { Component, OnInit, inject } from '@angular/core';
import { TypesService } from '../../shared/services/types.service';
import { AmountsService } from '../../shared/services/amounts.service';
import { ChartsService } from '../../shared/services/charts.service';
import { BkChartComponent } from '../bk-chart/bk-chart.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'spending',
    templateUrl: 'spending.component.html',
    styleUrls: ['spending.component.scss'],
	imports: [BkChartComponent, DatePipe],
})

export class SpendingComponent implements OnInit {
	private typesService = inject(TypesService);
	private amountsService = inject(AmountsService);
	private chartsService = inject(ChartsService);

	public types: { id: number; tag: string; image: string; total: number; }[];
	public selectedTypes: { id: number; tag?: string; image?: string; total?: number; }[] = [];
	public data: { date: Date; amount: number; types: string[]; }[] = [];

	public spendings: { title: string; amount: number; date: Date }[];
	public displaySpendings: { title: string; amount: number; date: Date }[];
	public searchSpending: string;

	public groups = ['Comparaison', 'Addition'];
	public group = 'Comparaison';

	public isSelectedType(type, types = this.selectedTypes) {
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
		
		// Spendings list
		if (this.selectedTypes.length === 1) {
			this.amountsService.getSpendingsByType(this.selectedTypes[0].id).subscribe(sp => {
				this.spendings = sp;
				this.searchSpending = "";
				this.search();
			});
		} else {
			this.spendings = null;
		}
	}

	public search() {
		if (!this.searchSpending) {
			this.displaySpendings = this.spendings.slice(0, 10);
		} else {
			this.displaySpendings = this.spendings.filter(s => s.title.toUpperCase().indexOf(this.searchSpending.toUpperCase()) !== -1).slice(0, 10);
		}
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
			}
		}
		this.chartsService.typesChartData.next(sentData);
	}

	ngOnInit() {
		this.typesService.getTypes().subscribe(x => this.types = x);
		this.amountsService.getAllSpending().subscribe(x => this.data = x);
	}
}