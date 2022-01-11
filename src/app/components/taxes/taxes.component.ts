import { Component, OnInit } from '@angular/core';
import { TaxesService } from 'src/app/shared/services/taxes.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {

  public rentTaxes = this.taxesService.getTaxes("Impôt sur le revenu");
  public buildTaxes;
  public homeTaxes = this.taxesService.getTaxes("Taxe d'habitation");

  constructor(
    private taxesService: TaxesService
  ) { }

  ngOnInit() {
    this.taxesService.getTaxes("Taxe foncière")
      .subscribe(t => this.buildTaxes = t);
  }

}
