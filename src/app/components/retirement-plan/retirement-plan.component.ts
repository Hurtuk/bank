import { Component, inject, OnInit } from '@angular/core';
import { AmountDirective } from 'src/app/shared/directives/amount.directive';
import { AmountsService } from 'src/app/shared/services/amounts.service';
import { BkChartComponent } from '../bk-chart/bk-chart.component';
import { ChartsService } from 'src/app/shared/services/charts.service';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-retirement-plan',
  imports: [AmountDirective, BkChartComponent, PercentPipe],
  templateUrl: './retirement-plan.component.html',
  styleUrl: './retirement-plan.component.scss'
})
export class RetirementPlanComponent implements OnInit {
  private amountService = inject(AmountsService);
  private chartService = inject(ChartsService);

  public data: any[];
  public byYear: {year: number, amount: number, taxCredit: number}[];
  public totalAmount = 0;
  public interests = 0;
  public totalTaxCredit = 0;

  public minDate = new Date(2023, 9, 1)

	public chartOptions = [
		[{option: 'borderColor', value: '#FFCE56'},
      {option: 'backgroundColor', value: '#FFCE56'},
			{option: 'fill', value: false},
			{option: 'borderWidth', value: 3}],
		[{option: 'borderColor', value: '#5FB5EF'},
			{option: 'backgroundColor', value: '#5FB5EF'},
			{option: 'fill', value: true},
			{option: 'borderWidth', value: 1}]
	];

  public ngOnInit(): void {
    this.amountService.getTransactionsByAccountAndYear(20).subscribe(data => {
      this.data = data;
      this.byYear = this.getByYear(data);
      this.data.forEach(d => {
        if (d.title === 'Intérêts') {
          this.interests += d.amount + d.variable;
        } else if (d.title === 'Transfert') {
          this.totalAmount += d.amount + d.variable;
        }
      });
      setTimeout(() => this.chartService.retirementData.next([
        {
          label: 'Versements',
          data: this.getVersementsChart(data)
        },
        {
          label: 'Valeur',
          data: this.getInterestChart(data)
        }
      ]));
    });
  }

  public getByYear(data: {date: Date, title: string, amount: number, variable: number}[]): {year: number, amount: number, taxCredit: number}[] {
    return data.filter(d => d.title === 'Transfert').reduce((acc, curr) => {
      const year = new Date(curr.date).getFullYear();
      const existing = acc.find(item => item.year === year);
      if (existing) {
        existing.amount += curr.amount + curr.variable;
      } else {
        acc.push({ year, amount: curr.amount + curr.variable });
      }
      this.totalTaxCredit += (curr.amount + curr.variable) * 0.3;
      return acc;
    }, [] as {year: number, amount: number}[]).map(item => {
      const taxCredit = item.amount * 0.3;
      return { ...item, taxCredit };
    }
    );
  }

  private getInterestChart(entries: { date: Date, title: string, amount: number, variable: number }[]): { date: Date, value: number }[] {
    const sortedEntries = entries.filter(d => d.title === 'Intérêts').sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let cumulative = 0;

    // Regrouper les sommes par mois
    const monthlySums = new Map<string, number>();

    for (const entry of sortedEntries) {
      const date = new Date(entry.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const currentSum = (monthlySums.get(key) || 0) + entry.amount;
      monthlySums.set(key, currentSum);
    }

    // Définir la plage de mois
    const startDate = new Date(sortedEntries[0].date);
    const endDate = new Date(sortedEntries[sortedEntries.length - 1].date);

    // Initialiser à début du mois
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

    const data: { date: Date; value: number }[] = [];

    while (current <= endDate) {
      const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;

      if (monthlySums.has(key)) {
        cumulative += monthlySums.get(key)!;
      }

      data.push({
        date: new Date(current), // Copie du Date courant (sinon mutation par référence)
        value: parseFloat(cumulative.toFixed(2)),
      });

      // Passer au mois suivant
      current.setMonth(current.getMonth() + 1);
    }

    return data;
  }

  private getVersementsChart(entries: { date: Date, title: string, amount: number, variable: number }[]): { date: Date, value: number }[] {
    const sortedEntries = entries.filter(d => d.title === 'Transfert').sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let cumulative = 0;

    // Regrouper les sommes par mois
    const monthlySums = new Map<string, number>();

    for (const entry of sortedEntries) {
      const date = new Date(entry.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const currentSum = (monthlySums.get(key) || 0) + entry.amount + entry.variable;
      monthlySums.set(key, currentSum);
    }

    // Définir la plage de mois
    const startDate = new Date(sortedEntries[0].date);
    const endDate = new Date(sortedEntries[sortedEntries.length - 1].date);

    // Initialiser à début du mois
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

    const data: { date: Date; value: number }[] = [];

    while (current <= endDate) {
      const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;

      if (monthlySums.has(key)) {
        cumulative += monthlySums.get(key)!;
      }

      data.push({
        date: new Date(current), // Copie du Date courant (sinon mutation par référence)
        value: parseFloat(cumulative.toFixed(2)),
      });

      // Passer au mois suivant
      current.setMonth(current.getMonth() + 1);
    }

    return data;
  }
}
