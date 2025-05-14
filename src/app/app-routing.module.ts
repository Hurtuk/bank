import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
	{ path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
	{ path: 'spending', loadComponent: () => import('./components/spending/spending.component').then(m => m.SpendingComponent) },
	{ path: 'bills', loadComponent: () => import('./components/bills/bills.component').then(m => m.BillsComponent) },
	{ path: 'month-ends', loadComponent: () => import('./components/month-ends/month-ends.component').then(m => m.MonthEndsComponent) },
	{ path: 'loans', loadComponent: () => import('./components/loans/loans.component').then(m => m.LoansComponent) },
	{ path: 'trade', loadComponent: () => import('./components/trade/trade.component').then(m => m.TradeComponent) },
	{ path: 'forecast', loadComponent: () => import('./components/forecast/forecast.component').then(m => m.ForecastComponent) },
	{ path: 'retirement', loadComponent: () => import('./components/retirement-plan/retirement-plan.component').then(m => m.RetirementPlanComponent) },
	{ path: 'income', loadComponent: () => import('./components/income/income.component').then(m => m.IncomeComponent) },
	{ path: 'real-estate/:id', loadComponent: () => import('./components/real-estate/real-estate.component').then(m => m.RealEstateComponent) },
	{ path: 'travels', loadComponent: () => import('./components/travels/travels.component').then(m => m.TravelsComponent) },
	{ path: 'taxes', loadComponent: () => import('./components/taxes/taxes.component').then(m => m.TaxesComponent) },
	{ path: 'electricity', loadComponent: () => import('./components/electricity/electricity.component').then(m => m.ElectricityComponent) },
	{ path: 'login', loadComponent: () => import('./components/admin/login/login.component').then(m => m.LoginComponent) },
	{ path: 'admin', loadChildren: () => import('./admin-routing.module').then(r => r.ADMIN_ROUTES) }
];