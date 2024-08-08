import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceDepartmentDataService } from 'src/app/shared/api/police-department-data.service';

@Component({
  selector: 'app-police-login',
  templateUrl: './police-login.component.html',
  styleUrls: ['./police-login.component.scss']
})
export class PoliceLoginComponent implements OnInit {
  policeImageUrl: string = '';
  police_name: any;

  constructor(private policeDepartmentService: PoliceDepartmentDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  //ngOnInit
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
      if (this.police_name) {
        this.getByNamePoliceDepartment();
      }
    });
  }

  //get by name
  getByNamePoliceDepartment() {
    this.policeDepartmentService.getByNamePoliceDepartmentDetails(this.police_name).subscribe(res => {
      if (res.status) {
        this.policeImageUrl = res.data.url;
      }
    })
  }

  //on submit
  onSubmit() {
    this.router.navigate(['reports/',this.police_name]);
  }
}
