import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceDepartmentDataService } from 'src/app/shared/api/police-department-data.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  policeImageUrl: string = '';
  police_name: any;
  policeDepartmentForm: FormGroup;

  constructor(private fb: FormBuilder, private policeDepartmentService: PoliceDepartmentDataService, private router: Router, private activatedRoute: ActivatedRoute) {}

  //ngOnInit
  ngOnInit(): void {
    this.policeDepartmentForm = this.fb.group({
      crashDate: [''],
      reportNumber: [''],
      firstName: [''],
      lastName: [''],
      location: [''],
      addedOnFromDate: [''],
      addedOnToDate: ['']
    });
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

  // Search Function  For  Account
  onSearch() {
    // this.currentPage = 1
    // this.searchData = {
    //   page: this.currentPage,
    //   itemsPerPage: this.pageValue,
    //   addedOnFromDate: (this.searchOccupantsForm.value.addedOnFromDate) ? this.searchOccupantsForm.value.addedOnFromDate : "",
    //   addedOnToDate: (this.searchOccupantsForm.value.addedOnToDate) ? this.searchOccupantsForm.value.addedOnToDate : "",
    //   countyId: (this.searchOccupantsForm.value.countyId) ? this.searchOccupantsForm.value.countyId : "",
    //   crashDate: (this.searchOccupantsForm.value.crashDate) ? this.searchOccupantsForm.value.crashDate : "",
    //   firstName: (this.searchOccupantsForm.value.firstName) ? this.searchOccupantsForm.value.firstName : "",
    //   lastName: (this.searchOccupantsForm.value.lastName) ? this.searchOccupantsForm.value.lastName : "",
    //   policeDepartmentId: (this.searchOccupantsForm.value.policeDepartmentId) ? this.searchOccupantsForm.value.policeDepartmentId : "",
    //   location: (this.searchOccupantsForm.value.location) ? this.searchOccupantsForm.value.location : "",
    //   reportNumber: (this.searchOccupantsForm.value.reportNumber) ? this.searchOccupantsForm.value.reportNumber : "",
    //   reportType: 2,
    //   searchType: 1,
    //   accountId: 0,
    // };
    // this.occupantDetail.length <= this.pageValue ? this.pageValue = 5 : '';
    // this.getAllOccupants();
  }

  // Reset  Search
  resetSearch() {
    // this.currentPage = 1;
    // this.searchOccupantsForm.reset();
    // this.searchData = {
    //   page: this.currentPage,
    //   itemsPerPage: this.pageValue,
    //   addedOnFromDate: (this.searchOccupantsForm.value.addedOnFromDate) ? this.searchOccupantsForm.value.addedOnFromDate : "",
    //   addedOnToDate: (this.searchOccupantsForm.value.addedOnToDate) ? this.searchOccupantsForm.value.addedOnToDate : "",
    //   countyId: (this.searchOccupantsForm.value.countyId) ? this.searchOccupantsForm.value.countyId : "",
    //   crashDate: (this.searchOccupantsForm.value.crashDate) ? this.searchOccupantsForm.value.crashDate : "",
    //   firstName: (this.searchOccupantsForm.value.firstName) ? this.searchOccupantsForm.value.firstName : "",
    //   lastName: (this.searchOccupantsForm.value.lastName) ? this.searchOccupantsForm.value.lastName : "",
    //   policeDepartmentId: (this.searchOccupantsForm.value.policeDepartmentId) ? this.searchOccupantsForm.value.policeDepartmentId : "",
    //   location: (this.searchOccupantsForm.value.location) ? this.searchOccupantsForm.value.location : "",
    //   reportNumber: (this.searchOccupantsForm.value.reportNumber) ? this.searchOccupantsForm.value.reportNumber : "",
    //   reportType: 2,
    //   searchType: 1,
    //   accountId: 0,
    // };
    // this.getAllOccupants();
    // this.occupantDetail.length <= this.pageValue ? this.pageValue = 5 : '';
  }
}
