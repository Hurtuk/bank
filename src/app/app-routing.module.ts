import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { SpendingComponent } from './components/spending/spending.component';
import { MonthEndsComponent } from './components/month-ends/month-ends.component';
import { TradeComponent } from './components/trade/trade.component';
import { LoginComponent } from './components/admin/login/login.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'spending', component: SpendingComponent },
	{ path: 'month-ends', component: MonthEndsComponent },
	{ path: 'trade', component: TradeComponent },
	{ path: 'login', component: LoginComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
