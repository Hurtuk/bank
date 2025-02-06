import { enableProdMode, importProvidersFrom } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/components/app.component';
import { provideRouter } from '@angular/router';
import { PUBLIC_ROUTES } from './app/app-routing.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule),
        provideRouter(PUBLIC_ROUTES),
        provideCharts(withDefaultRegisterables()),
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
