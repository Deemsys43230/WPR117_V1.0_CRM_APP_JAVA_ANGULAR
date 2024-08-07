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
  myForm: FormGroup;
  public departmentList: any[] = [];

  constructor(private fb: FormBuilder, private policeDepartmentService: PoliceDepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      police_department_id: ['']
    });
    this.getAllDepartments();
  }

    //get all department
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

    //on submit
    onSubmit() {
      this.router.navigate(['auth/policeDepartmentLogin/'+this.myForm.controls['police_department_id'].value])
    }
}
