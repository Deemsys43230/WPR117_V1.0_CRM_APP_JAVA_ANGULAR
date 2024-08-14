import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceDepartmentHeaderComponent } from './police-department-header.component';

describe('PoliceDepartmentHeaderComponent', () => {
  let component: PoliceDepartmentHeaderComponent;
  let fixture: ComponentFixture<PoliceDepartmentHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoliceDepartmentHeaderComponent]
    });
    fixture = TestBed.createComponent(PoliceDepartmentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
