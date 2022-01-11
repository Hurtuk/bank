import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartsService } from '../../shared/services/charts.service';
import { BaseChartDirective, Label } from 'ng2-charts';
import { DateService } from '../../shared/services/date.service';

@Component({
	selector: 'bk-chart',
	templateUrl: 'bk-chart.component.html',
	styleUrls: ['bk-chart.component.scss']
})

/**
 * Data passed as:
 * 	{data: {date: Date, value: number}[], label: string}[]
 */
export class BkChartComponent implements OnInit {
	@ViewChild('baseChart', { static: true }) chart: BaseChartDirective;

	@Input() initialData: string;
	@Input() offFilters = [];
	@Input() comparison = false;
	@Input() fillWith = 'zeros';
	@Input() add = false;
	@Input() chartOptions: {option: string, value: string | number}[][];
	@Input() header = true;
	@Input() minimum: number;
	@Input() minDate: Date;

	@Input() stackedPercent = false;

	public receivedData: {data: {date: Date, value: number}[], label: string}[];
	public data: {data: {date: Date, value: number}[], label: string}[];
	public total: number;
	public average: number;

	public displayData = [{data: [], label: 'new'}];
	public displayLabels: Date[] = [];
	public options: any = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				stacked: this.stackedPercent
			}
		}
	};
	public groups = ['Jour', 'Mois', 'Année'];
	public group: string;

	public sigma: boolean;

	constructor(
		private chartsService: ChartsService,
		private dateService: DateService
	) { }

	private fillHoles() {
		const minDate = new Date(2016, 0, 1);
		// Go through dates
		const now = new Date();
		const labelCursors = {};
		let date, dateToCompare;
		this.receivedData.forEach(x => { labelCursors[x.label] = 0; });
		// Loop on all dates from min to now
		for (const d = minDate; d <= now; d.setDate(d.getDate() + 1)) {
			// Loop on all types
			for (const type of this.receivedData) {
				if (labelCursors[type.label] >= type.data.length) {
					type.data.push({date: new Date(d), value: this.fillWith === 'zeros' || !type.data[labelCursors[type.label] - 1] ? 0 : type.data[labelCursors[type.label] - 1].value});
					labelCursors[type.label]++;
				} else {
					// If the next item makes time jump
					date = type.data[labelCursors[type.label]].date.getFullYear() + '-' + ('0' + type.data[labelCursors[type.label]].date.getMonth()).slice(-2) + '-' + ('0' + type.data[labelCursors[type.label]].date.getDate()).slice(-2);
					dateToCompare = d.getFullYear() + '-' + ('0' + d.getMonth()).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
					if (date > dateToCompare) {
						type.data.splice(labelCursors[type.label], 0, {date: new Date(d), value: this.fillWith === 'zeros' || !type.data[labelCursors[type.label] - 1] ? 0 : type.data[labelCursors[type.label] - 1].value});
					}
					labelCursors[type.label]++;
				}
			}
		}
	}

	private calculateDisplayData() {
		let sigma;
		switch (this.group) {
			case 'Jour':
				this.data.forEach(type => {
					if (this.sigma) {
						sigma = this.calculateSigma(type.data);
						type.data = this.sumBy(type.data, (d => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()), sigma);
					} else {
						type.data = this.sumBy(type.data, (d => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()));
					}
				});
				break;
			case 'Mois':
				this.data.forEach(type => {
					if (this.sigma) {
						sigma = this.calculateSigma(type.data);
						type.data = this.sumBy(type.data, (d => d.getFullYear() + '-' + (d.getMonth() + 1) + '-1'), sigma);
					} else {
						type.data = this.sumBy(type.data, (d => d.getFullYear() + '-' + (d.getMonth() + 1) + '-1'));
					}
				});
				break;
			case 'Année':
				this.data.forEach(type => {
					if (this.sigma) {
						sigma = this.calculateSigma(type.data);
						type.data = this.sumBy(type.data, (d => d.getFullYear() + '-1-1'), sigma);
					} else {
						type.data = this.sumBy(type.data, (d => d.getFullYear() + '-1-1'));
					}
				});
				break;
		}
		let temp = this.data;
		if (this.minDate) {
			temp.forEach(v => {
				v.data = v.data.filter(vv => vv.date > this.minDate);
			});
		}
		this.displayData = temp.map(x => ({ data: x.data.map(d => Math.round(d.value * 100) / 100), label: x.label }));
	}

	private calculateSigma(values) {
		const withoutZero = values.filter(x => x.value !== 0).map(x => x.value);
		const total = withoutZero.reduce((prev, current) => prev + current, 0);
		const average = total / withoutZero.length;
		const sig = withoutZero.reduce((prev, current) => prev + ((current - average) * (current - average)), 0);
		return {average: average, sigma: Math.sqrt(sig / withoutZero.length)};
	}

	private sumBy(data, dateFunc, sigma = null) {
		let dataByDate;
		if (!sigma) {
			dataByDate = data.reduce(function(dataByMonth, datum) {
				const group = dateFunc(datum.date);
				dataByMonth[group] = (dataByMonth[group] || 0) + datum.value;
				return dataByMonth;
			}, {});
		} else {
			dataByDate = data.reduce(function(dataByMonth, datum) {
				const group = dateFunc(datum.date);
				if (datum.value < sigma.average + 3 * sigma.sigma
					&& datum.value > sigma.average - 3 * sigma.sigma) {
					dataByMonth[group] = (dataByMonth[group] || 0) + datum.value;
				} else {
					dataByMonth[group] = (dataByMonth[group] || 0);
				}
				return dataByMonth;
			}, {});
		}
		return Object.keys(dataByDate).map(group => ({date: new Date(group), value: dataByDate[group]}));
	}

	/*private calculateDisplayLabels() {
		switch (this.group) {
			case 'Jour':
				if (!this.comparison || this.data.length <= 1) {
					this.displayLabels = this.data[0].data.map(d => d.date.getDate() + ' ' + this.dateService.months[d.date.getMonth()] + ' ' + d.date.getFullYear());
				} else {
					this.displayLabels = this.data[0].data.map(d => d.date.getDate().toString());
				}
				break;
			case 'Mois':
				if (!this.comparison || this.data.length <= 1) {
					this.displayLabels = this.data[0].data.map(d => this.dateService.months[d.date.getMonth()] + ' ' + d.date.getFullYear());
				} else {
					this.displayLabels = this.data[0].data.map(d => this.dateService.months[d.date.getMonth()]);
				}
				break;
			case 'Année':
				this.displayLabels = this.data[0].data.map(d => d.date.getFullYear().toString());
				break;
		}
	}*/

	private calculateDisplayLabels() {
		switch (this.group) {
			case 'Jour':
				if (!this.comparison || this.data.length <= 1) {
					this.displayLabels = this.data[0].data.map(d => d.date);
				} else {
					this.displayLabels = this.data[0].data.map(d => d.date);
				}
				break;
			case 'Mois':
				if (!this.comparison || this.data.length <= 1) {
					this.displayLabels = this.data[0].data.map(d => d.date);
				} else {
					this.displayLabels = this.data[0].data.map(d => d.date);
				}
				break;
			case 'Année':
				this.displayLabels = this.data[0].data.map(d => d.date);
				break;
		}
	}

	private calculateTotal() {
		this.total = this.displayData.reduce((prev, current) => prev.concat(current.data), []).reduce((prev, current) => prev + current, 0);
		this.average = this.total / (this.displayData.reduce((prev, current) => prev + current.data.length, 0));
	}

	public refresh() {
		this.data = [];
		for (const d of this.receivedData) {
			this.data.push({
				data: d.data.map(x => ({date: new Date(x.date), value: x.value})),
				label: d.label
			});
		}
		if (this.data.length) {
			this.calculateDisplayData();
			this.calculateDisplayLabels();
			this.calculateTotal();
			setTimeout(() => {
				if (this.chart !== undefined) {
					this.options.scales.xAxes[0].time.unit = this.group === 'Année' ? 'year': 'month';
					if (this.chartOptions) {
						this.chartOptions.forEach((opt, index) => {
							opt.forEach(option => {
								this.displayData[index][option.option] = option.value;
							});
						});
					}
					if (this.group === 'Jour') {
						this.chart.datasets.forEach(d => d.pointRadius = 0);
					}
					this.chart.ngOnDestroy();
					this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
					this.chart.chart.update();
				}
			}, 0);
		} else {
			this.total = 0;
			this.average = 0;
			this.displayData = [];
			this.chart.ngOnDestroy();
			this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
			this.chart.chart.update();
		}
	}

	public addValues() {
		this.receivedData.forEach((d, index) => {
			d.data = d.data.map((x, i) => ({
				date: x.date,
				value: x.value + (index ? this.receivedData[index - 1].data[i].value : 0)
			}));
		});
	}

	ngOnInit() {
		this.options.scales = {
			xAxes: [{
				type: 'time',
				time: {
					unit: this.group === 'Année' ? 'year': 'month',
				}
			}]
		};
		if (typeof this.minimum !== "undefined") {
			this.options.scales.yAxes = [{
				ticks: {
					min: this.minimum
				},
				stacked: this.stackedPercent
			}];
		}
		if (this.stackedPercent) {
			if (this.options.scales?.yAxes?.ticks) {
				this.options.scales.yAxes[0].ticks.max = 1;	
			} else {
				this.options.scales.yAxes = [{
					ticks: {
						max: 1
					},
					stacked: this.stackedPercent
				}];
			}
		}
		this.group = this.offFilters.indexOf('Mois') === -1 ? 'Mois' : 'Jour';
		this.chartsService[this.initialData].subscribe(x => {
			this.receivedData = x.map(d => ({
				label: d.label,
				data: d.data.map(dd =>
					({ date: dd.date, value: Number.parseFloat(dd.value) })
				)
			}));
			if (this.receivedData.length) {
				if (this.offFilters.indexOf('Jour') === -1) {
					this.fillHoles();
				}
				if (this.add) {
					this.addValues();
				}
				// TODO Fix
				if (!this.minimum && !this.receivedData.some(rd => rd.data.some(d => d.value < 0))) {
					this.options.scales.yAxes = [{
						ticks: {
							min: 0, max: this.stackedPercent ? 1 : undefined
						},
						stacked: this.stackedPercent
					}];
				}
			}
			this.refresh();
		});
	}
}