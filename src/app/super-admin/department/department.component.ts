import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableData } from 'src/app/constants';
import { Router } from '@angular/router';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { TableConfigComponent } from 'src/app/shared/table-config/table-config.component';
import { CountyService } from 'src/app/shared/services/county.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild(TableConfigComponent) TableConfigComponent: TableConfigComponent | undefined;

  public table_data: TableData;
  public searchData: any;
  public searchPoliceDepartmentForm: any;
  public currentPage: any = 1;
  public itemsPerPage = 5;
  public callChildComponent: boolean | undefined;
  public count: any[] = [];
  public countyList: any[] = [];


  constructor(private router: Router, private fb: FormBuilder, private policeDepartmentService: PoliceDepartmentService, private countyService: CountyService) { }

  ngOnInit(): void {
    this.initializationSearchAccessmanagementForm()
    this.searchData = {
      "page": this.currentPage,
      "items_per_page": this.itemsPerPage,
      "name": this.searchPoliceDepartmentForm.value.name ? this.searchPoliceDepartmentForm.value.name : "",
      "county": this.searchPoliceDepartmentForm.value.county ? this.searchPoliceDepartmentForm.value.county : "",
    }
    this.getPoliceDepartmentByPagination()
    this.getAllCounty()
  }

  //initialization of searchAccessmanagementForm
  initializationSearchAccessmanagementForm() {
    this.searchPoliceDepartmentForm = this.fb.group({
      name: "",
      county: "",
    })
  }

  //To Get all Police department details
  getPoliceDepartmentByPagination() {
    var policeData: any[] = [];
    this.policeDepartmentService.getPoliceDepartmentDetailsByPagination(this.searchData).subscribe(res => {
      if (res.status) {
        this.callChildComponent = true
        res.data.forEach((ele: any) => {
          policeData.push({
            code: ele.code,
            county_name: ele.county_name,
            login_link: ele.login_link,
            name: ele.name,
            search_link: ele.search_link,
            status: ele.status,
            viewLoginLink: ele.viewLoginLink,
            viewSearchLink: ele.viewSearchLink,
          })
        })
        this.table_data = {
          data: policeData,
          totalCount: res.count,
          labelName: ['name', 'county_name'],
          tableHeading: ['Name', 'County', 'Actions'],
          actionButton: ['View','Enable', 'Disable', 'Edit']
        }
        var length = Math.ceil(res.count / this.itemsPerPage);
        this.count = Array.from({ length }, (_, i) => i + 1);
        this.TableConfigComponent?.initialFunction(this.count);
        // this.flashMessage.successMessage("Get ALl Laywer Admin Details Successfully!!!")
      }
      // else {
      //   // this.spinner.hide();
      // }
    })
  }

  //get the role of the admin
  getAllCounty() {
    var data = {}
    this.countyService.getAllCounty(data).subscribe(res => {
      if (res.status) {
        this.countyList = []
        let counties = res.data;
        counties.forEach((element) => {
          let data = {
            "county_id": element.county_id,
            "county_name": element.name
          }
          this.countyList.push(data)
          // this.selectedMemberRole = this.roleList[0].role_id
        });
        // this.searchAccessmanagementForm.patchValue({
        //   role_id: this.selectedRole
        // })
      }
    })
  }


  // Pagination methods Starts

  //Page change events
  page(value: any) {
    this.currentPage = value.page;
    this.itemsPerPage = Number(value.item);
    this.searchData["page"] = this.currentPage
    this.searchData["items_per_page"] = this.itemsPerPage
    this.getPoliceDepartmentByPagination()
  }

  // Call Function based on action click's in table
  actionOutput(event: any) {
    console.log(event)
    // if (event.action == 'Edit') {
    //   this.editLawyerAdmin(event.data);
    // } else if (event.action == 'Enable' || event.action == 'Disable') {
    //   this.enabledisableLawyerAdmin(event.data);
    // } else if (event.action == 'Reset') {
    //   this.resetPasswordModalOpen(event.data)
    // }
  }

  // Pagination methods Ends


  //Navigate to Add Police department page
  addDepartment() {
    this.router.navigate(['superAdmin/department/add-department'])
  }

  //On search Police Department
  onSearch() {
    this.currentPage = 1
    this.searchData = {
      "page": this.currentPage,
      "items_per_page": this.itemsPerPage,
      "name": this.searchPoliceDepartmentForm.value.name ? this.searchPoliceDepartmentForm.value.name : "",
      "county": this.searchPoliceDepartmentForm.value.county ? this.searchPoliceDepartmentForm.value.county : "",
    }
    this.getPoliceDepartmentByPagination()
  }

  //On reset Police Department Search
  resetSearch() {
    this.currentPage = 1
    this.itemsPerPage = 5
    this.searchPoliceDepartmentForm.patchValue({
      "page": this.currentPage,
      "items_per_page": this.itemsPerPage,
      "name": "",
      "county": "",
    });
    this.searchData = {
      "page": this.currentPage,
      "items_per_page": this.itemsPerPage,
      "name": this.searchPoliceDepartmentForm.value.name ? this.searchPoliceDepartmentForm.value.name : "",
      "county": this.searchPoliceDepartmentForm.value.county ? this.searchPoliceDepartmentForm.value.county : "",
    }
    this.getPoliceDepartmentByPagination()
  }




}
