import { Component, OnInit, inject } from '@angular/core';
import { AmountsService } from 'src/app/shared/services/amounts.service';

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.scss'],
    standalone: false
})
export class ForecastComponent implements OnInit {
  private amountService = inject(AmountsService);


  public year = (new Date()).getFullYear();
  public items: {tag: {id: string, title: string}, current: number, expected: number, forecast: number, previous: number}[];
  public total: number;

  ngOnInit() {
    this.amountService.getForecast().subscribe(f => {
      this.items = f;
      this.total = this.items.reduce((sum, current) => sum + parseFloat(current.forecast.toString()), 0);
    });
  }

}
