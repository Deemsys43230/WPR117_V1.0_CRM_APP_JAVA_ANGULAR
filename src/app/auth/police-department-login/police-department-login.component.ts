import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';

@Component({
  selector: 'app-police-department-login',
  templateUrl: './police-department-login.component.html',
  styleUrls: ['./police-department-login.component.scss']
})
export class PoliceDepartmentLoginComponent implements OnInit {
  policeDepartmentForm: FormGroup;
  public departmentList: any[] = [];

  constructor(private fb: FormBuilder, private policeDepartmentService: PoliceDepartmentService, private router: Router) { }

  // ngOnInit
  ngOnInit(): void {
    this.policeDepartmentForm = this.fb.group({
      police_department_id: ['']
    });
    this.getAllDepartments();
  }

  // Get all department
  getAllDepartments() {
    this.policeDepartmentService
      .getPoliceDepartmentDetailsByPagination({
        page: 1,
        items_per_page: '',
        name: '',
        county: '',
      })
      .subscribe((res) => {
        if (res.status) {
          this.departmentList = res.data;
        }
      });
  }

  // On submit
  onSubmit() {
    const departmentId = this.policeDepartmentForm.controls['police_department_id'].value;
    const department = this.departmentList.find(dep => dep.department_id.toString() === departmentId.toString());
    if (department) {
      this.router.navigate(['ohio', department.name]);
    } else {
      console.error('Department not found for ID:', departmentId);
    }
  }
}
