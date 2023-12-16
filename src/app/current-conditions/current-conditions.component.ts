import { Component, inject, OnInit, Signal, Type } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LocationService } from '../location.service';
import { Route } from '@angular/router';
import { ConditionsAndZip } from '../conditions-and-zip.type';
import { take } from 'rxjs/operators';
import { NotificationService } from '../notificiation.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent implements OnInit {

  private weatherService = inject(WeatherService);
  public locationService = inject(LocationService);
  private notificationService = inject(NotificationService);

  public currentConditionsByZip: Signal<ConditionsAndZip[]> =
    this.weatherService.getCurrentConditions();

  ngOnInit(): void {
    // make sure stored locations are initialized after subscriptions in WeatherService
    this.locationService.locations$
      .pipe(take(1))
      .subscribe((locations) =>
        this.notificationService.notify(
          'LOCATIONS_READ_FROM_LOCALSTORAGE',
          locations
        )
      );
  }
}
