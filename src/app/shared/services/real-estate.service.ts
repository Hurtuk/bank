import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {
  private http = inject(HttpClient);
  private urlBuilder = inject(UrlBuilderService);


	public getName(idTag: number | string): Observable<string> {
		return this.http.get<string>(this.urlBuilder.buildUrl('getBuildingName', idTag));
	}

  public getRealEstateProfit(idTag: number | string): Observable<any> {
		return this.http.get<any>(this.urlBuilder.buildUrl('getRealEstateProfit', idTag));
	}

	public getLoanMonth(): Observable<any[]> {
		return this.http.get<any[]>(this.urlBuilder.buildUrl('getLoanMonth'));
	}
}
