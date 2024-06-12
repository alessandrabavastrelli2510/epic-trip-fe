import { TestBed } from '@angular/core/testing';

import { HolidayPackageService } from './holiday-package.service';

describe('HolidayPackageService', () => {
  let service: HolidayPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
