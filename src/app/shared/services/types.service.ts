import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';

@Injectable()
export class TypesService {
	private http = inject(HttpClient);
	private urlBuilder = inject(UrlBuilderService);


	public getTypes(): Observable<{id: number, tag: string, image: string, total: number}[]> {
		return this.http.get<{id: number, tag: string, image: string, total: number}[]>(this.urlBuilder.buildUrl('getTypes'));
	}

	public getTypesFromTransacTitle(title: string): Observable<number[]> {
		return this.http.get<number[]>(this.urlBuilder.buildUrl('getTypesFromTransacTitle', title));
	}
}
