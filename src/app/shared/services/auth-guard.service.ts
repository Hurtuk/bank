import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard  {
	private authService = inject(AuthService);
	private router = inject(Router);


	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const url: string = state.url;

		return this.checkLogin(url);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}

	checkLogin(url: string): boolean {
		if (this.authService.isLoggedIn) { return true; }

		// Store the attempted URL for redirecting
		this.authService.redirectUrl = url;

		// Navigate to the login page with extras
		this.router.navigate(['/login']);
		return false;
	}
}
