import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';

@Injectable()
export class AccountsService {
	constructor(
		private http: HttpClient,
		private urlBuilder: UrlBuilderService
	) { }

	public getAccounts(): Observable<{id: number, name: string}[]> {
		return this.http.get<{id: number, name: string}[]>(this.urlBuilder.buildUrl('getAccounts'));
	}

	public getAllAccounts(): Observable<{id: number, name: string, bank: string, openend: boolean}[]> {
		return this.http.get<{id: number, name: string, bank: string, openend: boolean}[]>(this.urlBuilder.buildUrl('getAllAccounts'));
	}

	public getLastItems(): Observable<{date: Date, title: string}[]> {
		return this.http.get<{date: Date, title: string}[]>(this.urlBuilder.buildUrl('getLastItems'));
	}

	public getAccountYears(idAccount: number): Observable<string[]> {
		return this.http.get<string[]>(this.urlBuilder.buildUrl('getAccountYears', idAccount));
	}
}
