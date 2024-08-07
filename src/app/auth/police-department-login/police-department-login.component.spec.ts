import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceDepartmentLoginComponent } from './police-department-login.component';

describe('PoliceDepartmentLoginComponent', () => {
  let component: PoliceDepartmentLoginComponent;
  let fixture: ComponentFixture<PoliceDepartmentLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoliceDepartmentLoginComponent]
    });
    fixture = TestBed.createComponent(PoliceDepartmentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
