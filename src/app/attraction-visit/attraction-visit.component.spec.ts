import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionVisitComponent } from './attraction-visit.component';

describe('AttractionVisitComponent', () => {
  let component: AttractionVisitComponent;
  let fixture: ComponentFixture<AttractionVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
