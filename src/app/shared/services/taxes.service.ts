import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(
    private http: HttpClient,
    private urlBuilder: UrlBuilderService
  ) { }

  public getTaxes(type: string): Observable<{sum: number, year: string, salary: number}[]> {
    return this.http.get<{sum: number, year: string, salary: number}[]>(this.urlBuilder.buildUrl('getTaxes', type));
  }
}
