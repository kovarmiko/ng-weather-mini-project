import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css'],
})
export class ZipcodeEntryComponent {
  constructor(private locationService: LocationService) {}

  addLocation(zipcode: string, form: NgForm) {
    // make sure invalid input is not sent to the server
    if (!form.valid) {
      return;
    }
    // clear artifacts of this search
    form.resetForm();

    this.locationService.addLocation(zipcode);
  }
}
