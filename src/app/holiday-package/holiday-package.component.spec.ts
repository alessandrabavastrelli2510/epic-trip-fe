import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPackageComponent } from './holiday-package.component';

describe('HolidayPackageComponent', () => {
  let component: HolidayPackageComponent;
  let fixture: ComponentFixture<HolidayPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
