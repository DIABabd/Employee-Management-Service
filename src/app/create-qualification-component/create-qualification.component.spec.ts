import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualificationComponent } from './create-qualification.component';

describe('CreateQualificationComponentComponent', () => {
  let component: CreateQualificationComponent;
  let fixture: ComponentFixture<CreateQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQualificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
