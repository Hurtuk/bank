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
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from 'src/interceptors';
import { LoansComponent } from './components/loans/loans.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';
import { TaxesComponent } from './components/taxes/taxes.component';
import { IncomeComponent } from './components/income/income.component';

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
		LoansComponent,
		ForecastComponent,
		ProgressBarComponent,
		RealEstateComponent,
		TaxesComponent,
		IncomeComponent,

		AmountDirective
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
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
		httpInterceptorProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
