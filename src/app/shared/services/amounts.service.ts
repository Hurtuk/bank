import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AmountsService {
	public totals = new BehaviorSubject({fixed: 0, thrift: 0, income: 0, stocks: 0});

	constructor(
		private http: HttpClient,
		private urlBuilder: UrlBuilderService
	) { }

	public updateTotals(): Observable<{fixed: number, thrift: number, income: number, stocks: number}> {
		return this.http.get<{fixed: number, thrift: number, income: number, stocks: number}>(this.urlBuilder.buildUrl('getTotals'))
			.pipe(tap(totals => this.totals.next(totals)));
	}

	public getHomeValues(): Observable<{
		fixed: {amount: number, bank: string, name: string}[],
		thrift: {amount: number, bank: string, name: string}[],
		income: {id: number, date: Date, amount: number, types: string[], title: string}[],
		stocks: {code: string, count: number, value: number}[]
	}> {
		return this.http.get<{
			fixed: {amount: number, bank: string, name: string}[],
			thrift: {amount: number, bank: string, name: string}[],
			income: {id: number, date: Date, amount: number, types: string[], title: string}[],
			stocks: {code: string, count: number, value: number}[]
		}>(this.urlBuilder.buildUrl('getHomeValues'));
	}

	public getTransactionsByAccountAndYear(idAccount: number, year: number): Observable<{
		id: number, date: Date, title: string, amount: number, variable: number, refunding: number, loan: number,
		types: {image: string, id: number, name: string}[]
	}[]> {
		return this.http.get<{
			id: number, date: Date, title: string, amount: number, variable: number, refunding: number, loan: number,
			types: {image: string, id: number, name: string}[]
		}[]>(this.urlBuilder.buildUrl('getTransactionsByAccountAndYear', idAccount, year));
	}

	public getAllVariables(): Observable<{id: number, date: Date, amount: number, title: string}[]> {
		return this.http.get<{id: number, date: Date, amount: number, title: string}[]>(this.urlBuilder.buildUrl('getAllVariables'));
	}

	public getSpendingsByType(idType: number): Observable<{title: string, amount: number, date: Date}[]> {
		return this.http.get<{title: string, amount: number, date: Date}[]>(this.urlBuilder.buildUrl('getSpendingsByType', idType));
	}

	public getAllSpending(): Observable<{date: Date, amount: number, types: string[]}[]> {
		return this.http.get<{date: Date, amount: number, types: string[]}[]>(this.urlBuilder.buildUrl('getAllSpending'));
	}

	public getMonthEnds(): Observable<{year: string, months: {month: number, value: number}[]}[]> {
		return this.http.get<{year: string, months: {month: number, value: number}[]}[]>(this.urlBuilder.buildUrl('getMonthEnds'));
	}

	public getTotalData(): Observable<{fixed: {date: Date, value: number}[], income: {date: Date, value: number}[], thrift: {date: Date, value: number}[], variable: {date: Date, value: number}[]}> {
		return this.http.get<{fixed: {date: Date, value: number}[], income: {date: Date, value: number}[], thrift: {date: Date, value: number}[], variable: {date: Date, value: number}[]}>(this.urlBuilder.buildUrl('getTotalData'));
	}

	public getCurrentsData(): Observable<{label: string, data: {date: Date, value: number}[]}[]> {
		return this.http.get<{label: string, data: {date: Date, value: number}[]}[]>(this.urlBuilder.buildUrl('getCurrents'));
	}

	public getBenefit(): Observable<{date: Date, value: number}[]> {
		return this.http.get<{date: Date, value: number}[]>(this.urlBuilder.buildUrl('getBenefit'));
	}

	public getBoughtActions(): Observable<{action: string, date: Date, value: number, count: number}[]> {
		return this.http.get<{action: string, date: Date, value: number, count: number}[]>(this.urlBuilder.buildUrl('getBoughtActions'));
	}

	public getLoans(): Observable<{id: number, title: string, amount: number, until: Date, image: string, refunds: any[]}[]> {
		return this.http.get<{id: number, title: string, amount: number, until: Date, image: string, refunds: any[]}[]>(this.urlBuilder.buildUrl('getLoans'));
	}

	public save(account: number, rows: any[]): Observable<void> {
		const body = {
			account,
			data: rows
		};
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		return this.http.post(this.urlBuilder.buildUrl('save'), body, { headers: headers })
						.pipe(map(() => {
							this.updateTotals().subscribe();
						}));
	}

	public getForecast(): Observable<{tag: {id: string, title: string}, current: number, expected: number, forecast: number, previous: number}[]> {
		return this.http.get<{tag: {id: string, title: string}, current: number, expected: number, forecast: number, previous: number}[]>(this.urlBuilder.buildUrl('getForecast'));
	}
}
