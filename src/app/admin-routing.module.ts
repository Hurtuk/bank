import { Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth-guard.service';

export const ADMIN_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent),
		canActivate: [AuthGuard]
	}
];
