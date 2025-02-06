import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SpendingComponent } from './components/spending/spending.component';
import { MonthEndsComponent } from './components/month-ends/month-ends.component';
import { TradeComponent } from './components/trade/trade.component';
import { LoginComponent } from './components/admin/login/login.component';
import { LoansComponent } from './components/loans/loans.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';
import { TaxesComponent } from './components/taxes/taxes.component';
import { IncomeComponent } from './components/income/income.component';
import { TravelsComponent } from './components/travels/travels.component';
import { BillsComponent } from './components/bills/bills.component';
import { ElectricityComponent } from './components/electricity/electricity.component';

export const PUBLIC_ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'spending', component: SpendingComponent },
	{ path: 'bills', component: BillsComponent },
	{ path: 'month-ends', component: MonthEndsComponent },
	{ path: 'loans', component: LoansComponent },
	{ path: 'trade', component: TradeComponent },
	{ path: 'forecast', component: ForecastComponent },
	{ path: 'income', component: IncomeComponent },
	{ path: 'real-estate/:id', component: RealEstateComponent },
	{ path: 'travels', component: TravelsComponent },
	{ path: 'taxes', component: TaxesComponent },
	{ path: 'electricity', component: ElectricityComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin', loadChildren: () => import('./admin-routing.module').then(r => r.ADMIN_ROUTES) }
];