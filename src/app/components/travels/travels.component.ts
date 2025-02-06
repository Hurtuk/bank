import { Component, OnInit, inject } from '@angular/core';
import { TravelsService } from 'src/app/shared/services/travels.service';

@Component({
    selector: 'app-travels',
    templateUrl: './travels.component.html',
    styleUrls: ['./travels.component.scss'],
    standalone: false
})
export class TravelsComponent implements OnInit {
  private travelService = inject(TravelsService);


  public travels: any[];

  ngOnInit(): void {
    this.travelService.getTravelCosts().subscribe(t => this.travels = t);
  }

}
