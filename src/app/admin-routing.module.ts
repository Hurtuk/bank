import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './shared/services/auth-guard.service';

const adminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
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
