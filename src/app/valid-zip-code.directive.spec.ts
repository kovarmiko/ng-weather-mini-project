import { ZipCodeValidator } from './valid-zip-code.directive';

describe('AppValidZipCodeDirective', () => {
  it('should create an instance', () => {
    const directive = new ZipCodeValidator();
    expect(directive).toBeTruthy();
  });
});
