import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CurrentConditions } from './current-conditions/current-conditions.type';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';
import { NotificationService } from './shared/notificiation.service';

export const ICON_URL =
  'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';

@Injectable()
export class WeatherService {
  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';

  private currentConditions = signal<ConditionsAndZip[]>([]);

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.notificationService
      .observe<string>('LOCATION_ADDED')
      // This service is a singleton. It will exist for the entire lifespan of this application. No need to unsubscribe
      .subscribe(({ payload }) => this.addCurrentConditions(payload));

    this.notificationService
      .observe<string>('LOCATION_REMOVED')
      .subscribe(({ payload }) => this.removeCurrentConditions(payload));

    this.notificationService
      .observe<string[]>('LOCATIONS_READ_FROM_LOCALSTORAGE')
      .subscribe(({ payload: zipcodes }) => {
        for (let zipcode of zipcodes) {
          if (
            !this.currentConditions()
              .map((condition) => condition.zip)
              .includes(zipcode)
          ) {
            this.addCurrentConditions(zipcode);
          }
        }
      });
  }
  // member can no longer be accessed directly
  private addCurrentConditions(zipcode: string): void {
    this.http
      .get<CurrentConditions>(
        `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
      )
      .subscribe((data) =>
        this.currentConditions.update((conditions) => [
          ...conditions,
          { zip: zipcode, 
            displayName: `${data.name} (${zipcode})`,
            data },
        ])
      );
  }
  // no longer accessible directly
  private removeCurrentConditions(zipcode: string) {
    this.currentConditions.update((conditions) => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode) {
          conditions.splice(+i, 1);
        }
      }
      return conditions;
    });
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(
      `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
    );
  }
}
