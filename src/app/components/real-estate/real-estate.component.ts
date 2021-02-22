import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RealEstateService } from 'src/app/shared/services/real-estate.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss']
})
export class RealEstateComponent implements OnInit {

  public realEstateData: any[];

  constructor(
    private realEstateService: RealEstateService
  ) { }

  ngOnInit() {
    this.realEstateService.getRealEstateProfit().pipe(
      tap(r => {
        const resultTab = [];
        for (const y in r) {
          resultTab.push({
            year: y,
            data: r[y].data,
            total: r[y].total,
            loan: r[y].loan,
            subtotal: r[y].subtotal
          });
        }
        this.realEstateData = resultTab;
        this.calculateTax();
      })
    ).subscribe();
  }

  private calculateTax() {
    let deficit = 0;
    for (const r of this.realEstateData) {
      r.previousDeficit = deficit;
      r.taxexempt = r.data.reduce((prev, cur) => prev += (cur.taxexempt == "1" && cur.value < 0 ? parseFloat(cur.value) : 0), 0);
      r.todeclare = r.total.plus + r.taxexempt;
      if (r.todeclare > 0) {
        const usableDeficit = Math.min(r.todeclare, Math.abs(deficit))
        r.todeclare -= usableDeficit;
        deficit += usableDeficit;
      } else {
        deficit += r.todeclare;
      }
    }
  }

}
