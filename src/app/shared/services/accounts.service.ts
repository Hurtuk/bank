import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountsService {
	constructor(
		private http: Http,
		private urlBuilder: UrlBuilderService
	) { }

	public getAccounts(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getAccounts'))
			.map(response => response.json().data);
	}

	public getAllAccounts(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getAllAccounts'))
			.map(response => response.json().data);
	}

	public getLastItems(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getLastItems'))
			.map(response => response.json().data);
	}

	public getAccountYears(idAccount: number): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getAccountYears', idAccount))
			.map(response => response.json().data);
	}
}
