import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
    providedIn: 'root'
})
export class ElectricityService {

    constructor(
        private http: HttpClient,
        private urlBuilder: UrlBuilderService
    ) { }

    public getElecData(): Observable<{data: any, years: any}> {
        return this.http.get<{data: any, years: any}>(this.urlBuilder.buildUrl('getElectricity'));
    }
}
