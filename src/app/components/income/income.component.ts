import { Component, OnInit } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';
import { ChartsService } from 'src/app/shared/services/charts.service';

@Component({
    selector: 'app-income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss'],
    standalone: false
})
export class IncomeComponent implements OnInit {

	public chartOptions = [
		[{option: 'backgroundColor', value: '#CF022B'}, // Travail
			{option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
    [{option: 'backgroundColor', value: '#008000'}, // Immobilier
      {option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
    [{option: 'backgroundColor', value: '#00A490'}, // CESI
      {option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
    [{option: 'backgroundColor', value: '#222F42'}, // Ecriture
      {option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
    [{option: 'backgroundColor', value: '#DDDDDD'}, // Autres
      {option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
	];

	public chartOptions2 = [
		[{option: 'backgroundColor', value: '#CF022B'}, // Travail
			{option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
    [{option: 'backgroundColor', value: '#008000'}, // Immobilier
      {option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
    [{option: 'backgroundColor', value: '#00A490'}, // CESI
      {option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
    [{option: 'backgroundColor', value: '#222F42'}, // Ecriture
      {option: 'borderWidth', value: 0},
      {option: 'pointRadius', value: 0}],
	];

  public perYear: { year: number, data: { label: string, value: number, evolution: number | null }[], sum: number }[];
  public percentPerYear: { year: number, data: { label: string, value: number }[] }[];
  public labels: string[];

	public minYear = (new Date()).getFullYear() - 5;

  constructor(
		private amountsService: AmountsService,
		private chartsService: ChartsService,
  ) { }

  ngOnInit(): void {
    this.amountsService.getIncome().subscribe(income => {
			const data = [];

      // Récupère la première date toutes données confondues
      let minDate = new Date();
      for (const entity in income) {
        if (income[entity][0].date < minDate) {
          minDate = new Date(income[entity][0].date);
        }
      }

      // First chart

      const now = new Date();
      const totals = [];
      for (const d = minDate; d <= now; d.setDate(d.getDate() + 1)) {
        let sum = 0;
        for (const entity in income) {
          const f = income[entity].find(v => Math.abs(v.date.getTime() - d.getTime()) < 1000 * 3600 * 2);
          if (f) {
            sum += parseFloat(f.value.toString());
          }
        }
        totals.push({ date: new Date(d), sum });
      }

      for (const entity in income) {
        data.push({ label: entity, data: income[entity].map(xx => {
          const total = totals.find(t => Math.abs(xx.date.getTime() - t.date.getTime()) < 1000 * 3600 * 2)?.sum;
          if (total) {
            return {date: new Date(xx.date), value: xx.value / total};
          } else {
            return {date: new Date(xx.date), value: 1};
          }
        })
        .filter(d => d.value > 0) });
      }
      this.chartsService.incomeData.next(data);

      // First table

      this.perYear = [];
      for (const entity in income) {
        for (const v of income[entity]) {
          const y = v.date.getFullYear();
          let yearData = this.perYear.find(py => py.year == y);
          if (!yearData) {
            this.perYear.push({ year: y, data: [], sum: 0 });
            yearData = this.perYear.find(py => py.year == y);
          }
          if (!yearData.data.find(d => d.label === entity)) {
            const s = income[entity].filter(e => e.date.getFullYear() === y).reduce((prev, cur) => prev + parseFloat(cur.value.toString()), 0);
            yearData.data.push({ label: entity, value: s, evolution: null });
            if (entity != 'Divers') {
              yearData.sum += s;
            }
          }
        }
      }
      for (const y of this.perYear) {
        for (const d of y.data) {
          const prev = this.perYear.find(py => py.year == y.year - 1)?.data.find(dd => dd.label == d.label);
          if (prev) {
            if (prev.value) {
              d.evolution = d.value / prev.value - 1;
            } else {
              d.evolution = 1;
            }
          }
        }
      }
      this.perYear.sort((a, b) => b.year - a.year);

      // Second chart

      const data2 = [];
      for (const entity in income) {
        if (entity != 'Divers') {
          data2.push({ label: entity, data: income[entity] });
        }
      }
      this.chartsService.incomeDetailData.next(data2);

      // Second table

      this.percentPerYear = this.perYear.map(py => ({
        year: py.year,
        data: py.data.filter(d => d.label != 'Divers').map(d => ({
          label: d.label,
          value: d.value / py.sum
        }))
      }));
		});
  }

  public getDataFromYear(yearData: any[], entity: string): { label: string, value: number, evolution: number } {
    return yearData.find(y => y.label == entity);
  }

  public getLabels(): string[] {
    if (!this.labels) {
      const order = ["Travail", "Immobilier", "CESI", "Ecriture", "Divers"];
      const labels = [];
      for (const py of this.perYear) {
        for (const data of py.data) {
          if (labels.indexOf(data.label) === -1) {
            labels.push(data.label);
          }
        }
      }
      this.labels = labels.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    }
    return this.labels;
  }

}
