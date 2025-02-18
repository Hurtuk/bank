import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AmountDirective } from 'src/app/shared/directives/amount.directive';
import { TravelsService } from 'src/app/shared/services/travels.service';

@Component({
    selector: 'app-travels',
    templateUrl: './travels.component.html',
    styleUrls: ['./travels.component.scss'],
    imports: [DatePipe, AmountDirective]
})
export class TravelsComponent implements OnInit {
  private travelService = inject(TravelsService);


  public travels: any[];

  ngOnInit(): void {
    this.travelService.getTravelCosts().subscribe(t => this.travels = t);
  }

}
