import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceDepartmentDataService } from 'src/app/shared/api/police-department-data.service';
import { CountyService } from 'src/app/shared/services/county.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent {
  policeImageUrl: string = '';
  police_name: any;
  county: string;
  name: string;
  loginLink: string;
  searchLink: string;
  countries: any[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private policeDepartmentService: PoliceDepartmentDataService, private countryService: CountyService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
    });
    this.getByNamePoliceDepartment();
    this.getAllCounty();
  }

  // Navigate back to reports list
  backToReportList() {
    this.router.navigate(['reports/', this.police_name])
  }

  // Get by name
  getByNamePoliceDepartment() {
    this.policeDepartmentService.getByNamePoliceDepartmentDetails(this.police_name).subscribe(res => {
      if (res.status) {
        this.county = res.data.county_id;
        this.name = res.data.name;
        this.loginLink = res.data.viewLoginLink;
        this.searchLink = res.data.viewSearchLink;
        this.getAllCounty();
      }
    })
  }

    // Get all country name
    getAllCounty() {
      this.countryService.getAllCounty({ page: 1, itemPerPage: "" }).subscribe((res) => {
        if (res.status) {
          if (this.county) { 
            const countyExists = res.data.find(item => item.county_id === this.county);
            if(countyExists) {
              this.county = countyExists.name;
            }
          } else {
            console.log('County ID is undefined');
          }
        }
      })
    }
  
}
