import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRedirectComponentComponent } from './login-redirect.component';

describe('LoginRedirectComponentComponent', () => {
  let component: LoginRedirectComponentComponent;
  let fixture: ComponentFixture<LoginRedirectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRedirectComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRedirectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
