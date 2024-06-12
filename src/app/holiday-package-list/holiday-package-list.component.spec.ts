import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPackageListComponent } from './holiday-package-list.component';

describe('HolidayPackageListComponent', () => {
  let component: HolidayPackageListComponent;
  let fixture: ComponentFixture<HolidayPackageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPackageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayPackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
