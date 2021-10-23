import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DateService } from 'src/app/shared/services/date.service';
import { RealEstateService } from 'src/app/shared/services/real-estate.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss']
})
export class RealEstateComponent implements OnInit {

  public data: any;
  
  public options: any = {
		responsive: true,
		maintainAspectRatio: true,
    aspectRatio: 1
	};

  constructor(
    private realEstateService: RealEstateService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.realEstateService.getRealEstateProfit().subscribe(r => {
      this.data = r;
      // Complete months
      const last_month = parseInt(this.data.per_month[0].month);
      for (let i = last_month + 1; i <= 12; i++) {
        this.data.per_month.unshift({year: this.data.per_month[0].year, month: i, value_plus: 0, value_minus: 0});
      }
      const years = new Set(this.data.per_month.map(m => m.year));
      for (const y of years) {
        const year = this.data.per_year.find(yy => yy.year == y);
        if (year) {
          year.plus = this.getPlusSum(y);
          year.minus = this.getMinusSum(y);
        } else {
          this.data.per_year.push({
            year: y,
            value: -1,
            plus: this.getPlusSum(y),
            minus: this.getMinusSum(y)
          })
        }
      }
    });
  }

	public getMonth(month: number): string {
		return this.dateService.months[month - 1];
	}

  private getPlusSum(year): number {
    return this.data.per_month.filter(m => m.year == year).reduce((prev, cur) => prev + parseFloat(cur.value_plus), 0);
  }

  private getMinusSum(year): number {
    return this.data.per_month.filter(m => m.year == year).reduce((prev, cur) => prev + parseFloat(cur.value_minus), 0);
  }

}
