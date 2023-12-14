import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CurrentConditions } from '../current-conditions.type';

export type zipcode = string


@Component({
  selector: 'app-current-condition',
  templateUrl: './current-condition.component.html',
  styleUrl: './current-condition.component.css',
})
export class CurrentConditionComponent {
  @Input() location: CurrentConditions | false = false;
  @Input() zipcode: string | false = false;
  @Output() locationRemoved: EventEmitter<zipcode> = new EventEmitter()

  public removeLocation(zipcode: zipcode) {
    this.locationRemoved.emit(zipcode)
  }

}
