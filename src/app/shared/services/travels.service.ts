import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';

@Injectable()
export class TravelsService {
	constructor(
		private http: HttpClient,
		private urlBuilder: UrlBuilderService
	) { }

	public getTravels(): Observable<{id: number, title: string}[]> {
		return this.http.get<{id: number, title: string}[]>(this.urlBuilder.buildUrl('getTravels'));
	}

	public getTravelCosts(): Observable<any[]> {
		return this.http.get<any[]>(this.urlBuilder.buildUrl('getTravelCosts'));
	}
}
