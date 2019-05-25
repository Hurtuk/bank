import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AmountsService {
	public totals = new Subject<any>();

	constructor(
		private http: Http,
		private urlBuilder: UrlBuilderService
	) { }

	public updateTotals(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getTotals'))
			.map(response => this.totals.next(response.json().data));
	}

	public getHomeValues(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getHomeValues'))
			.map(response => response.json().data);
	}

	public getTransactionsByAccountAndYear(idAccount: number, year: number): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getTransactionsByAccountAndYear', idAccount, year))
			.map(response => response.json().data);
	}

	public getAllVariables(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getAllVariables'))
			.map(response => response.json().data);
	}

	public getAllSpending(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getAllSpending'))
			.map(response => response.json().data);
	}

	public getMonthEnds(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getMonthEnds'))
			.map(response => response.json().data);
	}

	public getTotalData(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getTotalData'))
			.map(response => response.json().data);
	}

	public getCurrentsData(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getCurrents'))
			.map(response => response.json().data);
	}

	public getBenefit(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getBenefit'))
			.map(response => response.json().data);
	}

	public getBoughtActions(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getBoughtActions'))
			.map(response => response.json().data);
	}

	public save(account: number, rows: any[]): Observable<any> {
		const body = {
			account,
			data: rows
		};
		const headers = new Headers(
			{
				'Content-Type': 'application/json'
			});
		return this.http.post(this.urlBuilder.buildUrl('save'), body, new RequestOptions({ headers: headers }))
						.map(() => this.updateTotals().subscribe());
	}
}
