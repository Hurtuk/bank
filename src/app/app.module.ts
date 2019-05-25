import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { AmountDirective } from './shared/directives/amount.directive';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { UrlBuilderService } from './shared/services/url-builder.service';
import { AmountsService } from './shared/services/amounts.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { TypesService } from './shared/services/types.service';
import { AccountsService } from './shared/services/accounts.service';
import { SpendingComponent } from './components/spending/spending.component';
import { ChartsModule } from 'ng2-charts';
import { BkChartComponent } from './components/bk-chart/bk-chart.component';
import { ChartsService } from './shared/services/charts.service';
import { MonthEndsComponent } from './components/month-ends/month-ends.component';
import { DateService } from './shared/services/date.service';
import { TradeComponent } from './components/trade/trade.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminModule } from './admin.module';

@NgModule({
	declarations: [
		AppComponent,
		InfoBarComponent,
		MenuBarComponent,
		HomeComponent,
		SpendingComponent,
		BkChartComponent,
		MonthEndsComponent,
		TradeComponent,
		LoginComponent,

		AmountDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpModule,
		FormsModule,
		ChartsModule,
		AdminModule
	],
	providers: [
		UrlBuilderService,
		AmountsService,
		TypesService,
		AccountsService,
		ChartsService,
		DateService,
		AuthGuard,
		AuthService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
