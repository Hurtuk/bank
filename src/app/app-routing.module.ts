import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SpendingComponent } from './components/spending/spending.component';
import { MonthEndsComponent } from './components/month-ends/month-ends.component';
import { TradeComponent } from './components/trade/trade.component';
import { LoginComponent } from './components/admin/login/login.component';
import { LoansComponent } from './components/loans/loans.component';
import { ForecastComponent } from './components/forecast/forecast.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'spending', component: SpendingComponent },
	{ path: 'month-ends', component: MonthEndsComponent },
	{ path: 'loans', component: LoansComponent },
	{ path: 'trade', component: TradeComponent },
	{ path: 'forecast', component: ForecastComponent },
	{ path: 'login', component: LoginComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
