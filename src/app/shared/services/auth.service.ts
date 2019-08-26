import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
	isLoggedIn = false;

	redirectUrl: string;

	login(): Observable<boolean> {
		return of(true).pipe(map(() => this.isLoggedIn = true));
		//return of(true).delay(1000).do(val => this.isLoggedIn = true);
	}

	logout(): void {
		this.isLoggedIn = false;
	}
}
