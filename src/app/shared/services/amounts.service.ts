import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AmountsService {
	private http = inject(HttpClient);
	private urlBuilder = inject(UrlBuilderService);

	public totals = new BehaviorSubject({fixed: 0, thrift: 0, stockThrift: 0, income: 0, stocks: 0});

	public updateTotals(): Observable<{fixed: number, thrift: number, stockThrift: number, income: number, stocks: number}> {
		return this.http.get<{fixed: number, thrift: number, stockThrift: number, income: number, stocks: number}>(this.urlBuilder.buildUrl('getTotals'))
			.pipe(tap(totals => this.totals.next(totals)));
	}

	public getHomeValues(): Observable<{
		fixed: {amount: number, bank: string, name: string}[],
		thrift: {amount: number, bank: string, name: string}[],
		stockThrift: {amount: number, bank: string, name: string}[],
		income: {id: number, date: Date, amount: number, types: string[], title: string}[],
		stocks: {code: string, count: number, value: number}[]
	}> {
		return this.http.get<{
			fixed: {amount: number, bank: string, name: string}[],
			thrift: {amount: number, bank: string, name: string}[],
			stockThrift: {amount: number, bank: string, name: string}[],
			income: {id: number, date: Date, amount: number, types: string[], title: string}[],
			stocks: {code: string, count: number, value: number}[]
		}>(this.urlBuilder.buildUrl('getHomeValues'));
	}

	public getPerfs(): Observable<{code: string, value: number, d1: number, d7: number, d30: number}[]> {
		return this.http.get<{code: string, value: number, d1: number, d7: number, d30: number}[]>(this.urlBuilder.buildUrl('getStocksByPerf'));
	}

	public getTransactionsByAccountAndYear(idAccount: number, year?: number): Observable<{
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

	public getPlusMinus(): Observable<{year: string, month: number, plus: number, minus: number}[]> {
		return this.http.get<{year: string, month: number, plus: number, minus: number}[]>(this.urlBuilder.buildUrl('getRanges'));
	}

	public getTotalData(): Observable<{fixed: {date: Date, value: number}[], income: {date: Date, value: number}[], thrift: {date: Date, value: number}[], variable: {date: Date, value: number}[], variableEpargne: {date: Date, value: number}[]}> {
		return this.http.get<{fixed: {date: Date, value: number}[], income: {date: Date, value: number}[], thrift: {date: Date, value: number}[], variable: {date: Date, value: number}[], variableEpargne: {date: Date, value: number}[]}>(this.urlBuilder.buildUrl('getTotalData'));
	}

	public getCurrentsData(): Observable<{ actionCode: string, quantity: number, sumneg: number, sumpos: number, total: number, totalneg: number, totalpos: number, value: number, initial: number }[]> {
		return this.http.get<{ actionCode: string, quantity: number, sumneg: number, sumpos: number, total: number, totalneg: number, totalpos: number, value: number, initial: number }[]>(this.urlBuilder.buildUrl('getCurrents'));
	}

	public getBenefit(): Observable<{date: Date, value: number}[]> {
		return this.http.get<{date: Date, value: number}[]>(this.urlBuilder.buildUrl('getBenefit'));
	}

	public getBoughtActions(): Observable<{action: string, date: Date, value: number, count: number}[]> {
		return this.http.get<{action: string, date: Date, value: number, count: number}[]>(this.urlBuilder.buildUrl('getBoughtActions'));
	}

	public getLoans(): Observable<{id: number, title: string, amount: number, to_refund: number, rate: number, until: Date, image: string, refund: number}[]> {
		return this.http.get<{id: number, title: string, amount: number, to_refund: number, rate: number, until: Date, image: string, refund: number}[]>(this.urlBuilder.buildUrl('getLoans'));
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

	public getIncome(): Observable<{[name: string]: {date: Date, value: number}[]}> {
		return this.http.get<{[name: string]: {date: Date, value: number}[]}>(this.urlBuilder.buildUrl('getIncome'));
	}

	public getAutodata(item: any): Observable<any> {
		return this.http.get<any>(this.urlBuilder.buildUrl('getAutoData', item.title, item.types.map(t => t.id).sort((a, b) => a - b)));
	}

	public transfer(date: Date, amount: number, fromAccount: number, toAccount: number): Observable<void> {
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		return this.http.post<void>(this.urlBuilder.buildUrl('transfer'), {date, amount, fromAccount, toAccount}, { headers: headers });
	}
	
	public getBills(): Observable<any> {
		return this.http.get<any>(this.urlBuilder.buildUrl('getBills'));
	}
}
