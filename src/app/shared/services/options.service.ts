import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private http = inject(HttpClient);


  public getOptions(): Observable<{[data: string]: boolean}> {
      return this.http.get<{[data: string]: boolean}>('assets/options.json');
  }
}
