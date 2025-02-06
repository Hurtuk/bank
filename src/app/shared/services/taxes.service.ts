import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  private http = inject(HttpClient);
  private urlBuilder = inject(UrlBuilderService);


  public getTaxes(type: string): Observable<{sum: number, year: string, salary: number}[]> {
    return this.http.get<{sum: number, year: string, salary: number}[]>(this.urlBuilder.buildUrl('getTaxes', type));
  }
}
