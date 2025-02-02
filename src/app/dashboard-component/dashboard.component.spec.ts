import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponentComponent } from './dashboard.component';

describe('DashboardComponentComponent', () => {
  let component: DashboardComponentComponent;
  let fixture: ComponentFixture<DashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
