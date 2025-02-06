import { Component, OnInit, inject } from '@angular/core';
import { TaxesService } from 'src/app/shared/services/taxes.service';

@Component({
    selector: 'app-taxes',
    templateUrl: './taxes.component.html',
    styleUrls: ['./taxes.component.scss'],
    standalone: false
})
export class TaxesComponent implements OnInit {
  private taxesService = inject(TaxesService);


  public rentTaxes;
  public buildTaxes;
  public homeTaxes;

  ngOnInit() {
    this.taxesService.getTaxes("Taxe foncière")
      .subscribe(t => this.buildTaxes = t);
    this.rentTaxes = this.taxesService.getTaxes("Impôt sur le revenu");
    this.homeTaxes = this.taxesService.getTaxes("Taxe d'habitation");
  }

}
