import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(
    private http: HttpClient
  ) { }

  public getOptions(): Observable<{[data: string]: boolean}> {
      return this.http.get<{[data: string]: boolean}>('assets/options.json');
  }
}
