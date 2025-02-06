import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    templateUrl: './login.component.html',
    standalone: false
})
export class LoginComponent {
	message: string;
	password: string;

	constructor(public authService: AuthService, public router: Router) {
		this.setMessage();
	}

	setMessage() {
		this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
	}

	login() {
		this.message = 'Trying to log in ...';

		this.authService.login().subscribe(() => {
			this.setMessage();
			if (this.authService.isLoggedIn) {
				const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
				this.router.navigate([redirect]);
			}
		});
	}

	logout() {
		this.authService.logout();
		this.setMessage();
	}
}
