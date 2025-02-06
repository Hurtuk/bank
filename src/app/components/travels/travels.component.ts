import { Component, OnInit } from '@angular/core';
import { TravelsService } from 'src/app/shared/services/travels.service';

@Component({
    selector: 'app-travels',
    templateUrl: './travels.component.html',
    styleUrls: ['./travels.component.scss'],
    standalone: false
})
export class TravelsComponent implements OnInit {

  public travels: any[];

  constructor(
    private travelService: TravelsService
  ) { }

  ngOnInit(): void {
    this.travelService.getTravelCosts().subscribe(t => this.travels = t);
  }

}
