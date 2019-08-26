import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';

@Injectable()
export class TypesService {
	constructor(
		private http: HttpClient,
		private urlBuilder: UrlBuilderService
	) { }

	public getTypes(): Observable<{id: number, tag: string, image: string, total: number}[]> {
		return this.http.get<{id: number, tag: string, image: string, total: number}[]>(this.urlBuilder.buildUrl('getTypes'));
	}
}
