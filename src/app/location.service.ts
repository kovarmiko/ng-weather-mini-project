import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationStore } from '../store.class';
import { NotificationService } from '../notificiation.service';

export const LOCATIONS: string = 'locations';
const EMPTY_LOCATION_SET = []

@Injectable()
export class LocationService extends LocationStore<string[]> {
  public locations$: Observable<string[]>

  constructor(private notificationService: NotificationService) {
    super(EMPTY_LOCATION_SET);
    this.locations$ = this.getState()
    this.setState(JSON.parse(localStorage.getItem(LOCATIONS)) || []);
  }


  addLocation(zipcode: string) {
    this.setState([...this.getLocations(), zipcode]);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.getLocations()));
    this.notificationService.notify('LOCATION_ADDED', zipcode);
  }

  removeLocation(zipcode: string) {
    let index = this.getLocations().indexOf(zipcode);
    if (index !== -1) {
      this.setState(this.getLocations().filter(code => code !== zipcode))
      localStorage.setItem(LOCATIONS, JSON.stringify(this.getLocations()));
      this.notificationService.notify('LOCATION_REMOVED', zipcode);
    }
  }
}
