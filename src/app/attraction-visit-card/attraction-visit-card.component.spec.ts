import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionVisitCardComponent } from './attraction-visit-card.component';

describe('AttractionVisitCardComponent', () => {
  let component: AttractionVisitCardComponent;
  let fixture: ComponentFixture<AttractionVisitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionVisitCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionVisitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
