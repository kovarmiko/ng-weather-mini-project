import { Component, inject, OnInit, Signal } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';
import { ConditionsAndZip } from '../conditions-and-zip.type';
import { NotificationService } from '../shared/notificiation.service';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent implements OnInit {
  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected notificationService = inject(NotificationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> =
    this.weatherService.getCurrentConditions();

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode]);
  }

  ngOnInit(): void {
    // make sure stored locations are initialized after subscriptions in WeatherService
    this.initializeStoredLocations();
  }

  private initializeStoredLocations(): void {
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
