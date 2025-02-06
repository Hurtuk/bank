import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { UrlBuilderService } from './app/shared/services/url-builder.service';
import { AmountsService } from './app/shared/services/amounts.service';
import { TypesService } from './app/shared/services/types.service';
import { AccountsService } from './app/shared/services/accounts.service';
import { ChartsService } from './app/shared/services/charts.service';
import { DateService } from './app/shared/services/date.service';
import { AuthGuard } from './app/shared/services/auth-guard.service';
import { AuthService } from './app/shared/services/auth.service';
import { TravelsService } from './app/shared/services/travels.service';
import { ElectricityService } from './app/shared/services/electricity.service';
import { httpInterceptorProviders } from 'src/interceptors';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AdminModule } from './app/admin.module';
import { AppComponent } from './app/components/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, NgChartsModule, AdminModule),
        UrlBuilderService,
        AmountsService,
        TypesService,
        AccountsService,
        ChartsService,
        DateService,
        AuthGuard,
        AuthService,
        TravelsService,
        ElectricityService,
        httpInterceptorProviders,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.log(err));
