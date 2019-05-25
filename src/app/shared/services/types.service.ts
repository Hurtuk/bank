import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class TypesService {
	constructor(
		private http: Http,
		private urlBuilder: UrlBuilderService
	) { }

	public getTypes(): Observable<any> {
		return this.http.get(this.urlBuilder.buildUrl('getTypes'))
			.map(response => response.json().data);
	}
}
