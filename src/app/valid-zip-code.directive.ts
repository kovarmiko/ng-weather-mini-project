import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[validZipCode]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ZipCodeValidator, multi: true },
  ],
})
export class ZipCodeValidator implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return ZipCodeValidator.validateZipCode(control);
  }

  static validateZipCode(control: AbstractControl): ValidationErrors | null {
    const zipCodeMatcher = /^\d{5}$/

    if ( zipCodeMatcher.test('' + control.value)) {
      return null
    }

    return {zipCode : 'A zip code can only be a 5-digit number'}
  }
}
