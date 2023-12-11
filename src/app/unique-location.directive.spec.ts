import { inject } from '@angular/core/testing';
import { UniqueLocationValidator } from './unique-location.directive';
import { LocationService } from './location.service';

describe('UniqueLocationDirective', () => {
  it('should create an instance', inject(
    [LocationService],
    (location: LocationService) => {
      const directive = new UniqueLocationValidator(location);
      expect(directive).toBeTruthy();
    }
  ));
});
