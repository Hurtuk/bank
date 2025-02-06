import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './shared/services/auth-guard.service';

const adminRoutes: Routes = [
	{
		path: 'admin',
		loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent),
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AdminRoutingModule {}
