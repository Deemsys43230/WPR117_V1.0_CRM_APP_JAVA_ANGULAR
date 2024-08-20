import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableData } from 'src/app/constants';
import { Router } from '@angular/router';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { TableConfigComponent } from 'src/app/shared/table-config/table-config.component';
import { CountyService } from 'src/app/shared/services/county.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';

declare var bootstrap: any;
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @ViewChild(TableConfigComponent) TableConfigComponent:
    | TableConfigComponent
    | undefined;

  public table_data: TableData;
  public searchData: any;
  public searchPoliceDepartmentForm: any;
  public currentPage: any = 1;
  public items_per_page = 5;
  public callChildComponent: boolean | undefined;
  public countyList: any[] = [];
  public searchValue: any;
  public supportingImage: any;
  public openModel: boolean = false;
  public policeDepartment: any = null;
  public viewModal: any;
  public isImage: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private policeDepartmentService: PoliceDepartmentService,
    private countyService: CountyService,
    private spinner: NgxSpinnerService,
    private flashMessageService: FlashMessageService
  ) { }

  ngOnInit(): void {
    this.initializationSearchAccessmanagementForm();
    this.setupSearchData()
    //Create up view Model 
    const modalElement = document.getElementById('viewModal');
    if (modalElement) {
      this.viewModal = new bootstrap.Modal(modalElement);
    }
    this.getPoliceDepartmentByPagination();
    this.getAllCounty();
  }

  //initialization of searchAccessmanagementForm
  initializationSearchAccessmanagementForm() {
    this.searchPoliceDepartmentForm = this.fb.group({
      name: '',
      county: '',
    });
  }

  // Setup Search Data
  setupSearchData() {
    this.searchData = {
      page: this.currentPage,
      items_per_page: this.items_per_page,
      name: "",
      county: "",
    };
  }

  //To Get all Police department details
  getPoliceDepartmentByPagination() {
    this.spinner.show();
    var policeData: any[] = [];
    this.policeDepartmentService.getPoliceDepartmentDetailsByPagination(this.searchData).subscribe((res) => {
      if (res.status) {
        this.spinner.hide();
        this.callChildComponent = true;
        res.data.forEach((ele: any) => {
          policeData.push({
            code: ele.code,
            county_name: ele.county_name,
            login_link: ele.login_link,
            name: ele.name,
            search_link: ele.search_link,
            viewLoginLink: ele.viewLoginLink,
            viewSearchLink: ele.viewSearchLink,
            department_id: ele.department_id,
            status: ele.is_enabled
          });
        });
        this.table_data = {
          data: policeData,
          totalCount: res.count,
          labelName: ['name', 'county_name'],
          tableHeading: ['Name', 'County', 'Actions'],
          actionButton: ['View', 'Enable', 'Disable', 'Edit'],
        };
        this.TableConfigComponent?.initialFunction(res.count);
      }
      else {
        this.spinner.hide();
      }
    });
  }

  //Get All County
  getAllCounty() {
    var data = {};
    this.countyService.getAllCounty(data).subscribe((res) => {
      if (res.status) {
        this.countyList = [];
        let counties = res.data;
        counties.forEach((element) => {
          let data = {
            county_id: element.county_id,
            county_name: element.name,
          };
          this.countyList.push(data);
        });
      }
    });
  }

  //Get Police Department details by id
  getPoliceDepartmentById(id) {
    this.policeDepartmentService.getByIdPoliceDepartmentDetails(id).subscribe(res => {
      if (res.status) {
        this.policeDepartment = {
          police_department_id: res.data.department_id,
          name: res.data.name,
          county_name: res.data.count_name,
          code: res.data.code,
          loginLink: res.data.viewLoginLink,
          searchLink: res.data.viewSearchLink,
        }
        if (res.data.url) {
          this.supportingImage = res.data.url
          this.isImage = true
        }
      }
    })
  }

  // Pagination methods Starts
  //Page change events
  page(value: any) {
    this.currentPage = value.page;
    this.items_per_page = Number(value.item);
    this.searchData["items_per_page"] = this.items_per_page;
    this.searchData["page"] = this.currentPage;
    this.getPoliceDepartmentByPagination();
  }

  // Call Function based on action click's in table
  actionOutput(event: any) {
    if (event.action == 'Edit') {
      this.editPoliceDepartment(event.data);
    }
    else if (event.action == 'Enable' || event.action == 'Disable') {
      this.enableDisablePoliceDepartment(event.data)
    }
    else if (event.action == 'View') {
      const dep_id = event.data.department_id;
      this.getPoliceDepartmentById(dep_id)
      this.openModal()
    }
  }
  // Pagination methods Ends

  //Open view modal
  openModal() {
    if (this.viewModal) {
      this.viewModal.show();
    }
  }

  //Navigate to edit Police department page
  editPoliceDepartment(data) {
    this.router.navigate(['superAdmin/policeDepartment/add-police-department', `${data.department_id}`]);
  }

  //Navigate to Add Police department page
  addDepartment() {
    this.router.navigate(['superAdmin/policeDepartment/add-police-department']);
  }

  // Enable and Disbale Department
  enableDisablePoliceDepartment(data) {
    const dep_id = data.department_id;
    const body = {
      "is_enabled": data.status == 0 ? 1 : 0
    }
    this.policeDepartmentService.enableDisablePoliceDepartment(body, dep_id).subscribe((res) => {
      if (res.status) {
        this.getPoliceDepartmentByPagination();
        if (res.is_enabled == 1) {
          this.flashMessageService.successMessage(res.msg)
        }
        else {
          this.flashMessageService.successMessage(res.msg)
        }
      }
    })
  }

  //On search Police Department
  onSearch() {
    this.currentPage = 1;
    this.searchData = {
      page: this.currentPage,
      items_per_page: this.items_per_page,
      name: this.searchPoliceDepartmentForm.value.name ? this.searchPoliceDepartmentForm.value.name : "",
      county: this.searchPoliceDepartmentForm.value.county ? this.searchPoliceDepartmentForm.value.county : "",
    };
    this.getPoliceDepartmentByPagination();
  }

  //On reset Police Department Search
  resetSearch() {
    this.currentPage = 1;
    this.items_per_page = 5;
    this.searchPoliceDepartmentForm.reset({ county: '' });
    this.setupSearchData();
    this.getPoliceDepartmentByPagination();
  }
}
