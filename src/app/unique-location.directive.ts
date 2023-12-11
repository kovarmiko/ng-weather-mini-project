import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { LocationService } from './location.service';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

@Directive({
  selector: '[uniqueLocation]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueLocationValidator,
      multi: true,
    },
  ],
})
export class UniqueLocationValidator implements AsyncValidator {
  

  constructor(private locationService: LocationService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return UniqueLocationValidator.validateLocationUniqueness(control, this.locationService.locations$)
  }

  static validateLocationUniqueness(
    control: AbstractControl,
    locations$: Observable<string[]>
  ): Observable<ValidationErrors | null> {
    return locations$.pipe(
      map((locations) => {
        return locations.includes(control.value)
          ? {
              locationUniqueness:
                'A result for this zip code already exists in the stored locations',
            }
          : null;
      }),
      // async validation seemingly won't work unless this observable completes
      take(1),
    );
  }
}
