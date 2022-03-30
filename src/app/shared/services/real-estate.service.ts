import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  constructor(
		private http: HttpClient,
		private urlBuilder: UrlBuilderService
	) { }

  public getRealEstateProfit(): Observable<any> {
		return this.http.get<any>(this.urlBuilder.buildUrl('getRealEstateProfit', 29));
	}
}
