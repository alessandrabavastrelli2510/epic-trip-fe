import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedPackageComponent } from './reserved-package.component';

describe('ReservedPackageComponent', () => {
  let component: ReservedPackageComponent;
  let fixture: ComponentFixture<ReservedPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
