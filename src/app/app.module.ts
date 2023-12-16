import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import { LocationService } from './location.service';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { WeatherService } from './weather.service';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ZipCodeValidator } from './valid-zip-code.directive';
import { UniqueLocationValidator } from './unique-location.directive';
import { CurrentConditionComponent } from './current-conditions/current-condition/current-condition.component';
import { WeahterIconSrcDirective } from './weahter-icon-src.directive';
import { CachingHttpService } from './caching-http.service';
import { CACHE_TTL, TWO_HOURS_IN_MILISECONDS } from './config';
import { UpdateCacheFrequencyComponent } from './update-cache-frequency/update-cache-frequency.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    CurrentConditionComponent,
    MainPageComponent,
    ZipCodeValidator,
    UniqueLocationValidator,
    WeahterIconSrcDirective,
    TabComponent,
    TabsComponent,
    UpdateCacheFrequencyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    LocationService,
    WeatherService,
    CachingHttpService,
    {provide: CACHE_TTL, useValue: TWO_HOURS_IN_MILISECONDS},
    {
      provide: HTTP_INTERCEPTORS,
      // make `CachingHttpService` a singleton to enable configuration
      useExisting: CachingHttpService, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
