import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementPlanComponent } from './retirement-plan.component';

describe('RetirementPlanComponent', () => {
  let component: RetirementPlanComponent;
  let fixture: ComponentFixture<RetirementPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetirementPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
