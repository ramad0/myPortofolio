import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExperienceComponent } from './dashboard-experience.component';

describe('DashboardExperienceComponent', () => {
  let component: DashboardExperienceComponent;
  let fixture: ComponentFixture<DashboardExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
