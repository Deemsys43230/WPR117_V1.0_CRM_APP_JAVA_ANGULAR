import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableData } from 'src/app/constants';
import { AccountsDepartmentService } from 'src/app/shared/services/accounts-department-service';
import { TableConfigComponent } from 'src/app/shared/table-config/table-config.component';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';

@Component({
  selector: 'app-accounts-component',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  @ViewChild(TableConfigComponent) TableConfigComponent:
    | TableConfigComponent
    | undefined;

  public table_data: TableData;
  public searchData: any;
  public searchAccountsDepartmentForm: any;
  public currentPage: any = 1;
  public itemsPerPage = 5;
  public callChildComponent: boolean | undefined;
  public count: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountsDepartmentService: AccountsDepartmentService,
    private policeDepartmentService: PoliceDepartmentService
  ) { }

  ngOnInit(): void {
    this.initializationSearchAccessManagementForm();
    this.searchData = {
      page: this.currentPage,
      items_per_page: this.itemsPerPage,
      first_name: this.searchAccountsDepartmentForm.value.first_name
        ? this.searchAccountsDepartmentForm.value.first_name
        : '',
      last_name: this.searchAccountsDepartmentForm.value.last_name
        ? this.searchAccountsDepartmentForm.value.last_name
        : '',
      username: this.searchAccountsDepartmentForm.value.username
        ? this.searchAccountsDepartmentForm.value.username
        : '',
      email_id: this.searchAccountsDepartmentForm.value.email_id
        ? this.searchAccountsDepartmentForm.value.email_id
        : '',
      role_id: this.searchAccountsDepartmentForm.value.role_id
        ? this.searchAccountsDepartmentForm.value.role_id
        : '',
      police_department_id: this.searchAccountsDepartmentForm.value
        .police_department_id
        ? this.searchAccountsDepartmentForm.value.police_department_id
        : '',
    };
    this.getAccountsDepartmentByPagination();
  }

  //initialization of searchAccessManagementForm
  initializationSearchAccessManagementForm() {
    this.searchAccountsDepartmentForm = this.fb.group({
      first_name: '',
      last_name: '',
      username: '',
      email_id: '',
      role_id: '',
      police_department_id: '',
    });
  }

  //To Get all Account department details
  getAccountsDepartmentByPagination() {
    var policeData: any[] = [];
    var policeDepData = { page: 1, items_per_page: "", name: "", county: "" }
    const departmentMap = new Map<number, string>();
    this.policeDepartmentService
      .getPoliceDepartmentDetailsByPagination(policeDepData)
      .subscribe((res) => {
        if (res.status) {
          this.callChildComponent = true;
          policeData = res.data
            .filter(item => res.data.map(item => item.police_department_id).includes(item.department_id))
            .map(item => ({
              police_department_id: item.department_id,
              name: item.name
            }));
          res.data.forEach(item => {
            departmentMap.set(item.department_id, item.name);
          });
        }
      });
    this.accountsDepartmentService
      .getAccountsDepartmentDetailsByPagination(this.searchData)
      .subscribe((res) => {
        if (res.status) {
          this.callChildComponent = true;
          res.data.forEach((ele: any) => {
            policeData.push({
              email_id: ele.email_id,
              first_name: ele.first_name,
              last_name: ele.last_name,
              username: ele.username,
              role_id: ele.role_id,
              police_department_id: departmentMap.get(ele.police_department_id) || 'Unknown'
            });
          });
          this.table_data = {
            data: policeData,
            totalCount: res.count,
            labelName: [
              'first_name',
              'last_name',
              'username',
              'email_id',
              'police_department_id',
            ],
            tableHeading: [
              'First Name',
              'Last Name',
              'User Name',
              'Email Id',
              'Police Department',
              'Actions',
            ],
            actionButton: ['View', 'Enable', 'Disable', 'Edit'],
          };
          var length = Math.ceil(res.count / this.itemsPerPage);
          this.count = Array.from({ length }, (_, i) => i + 1);
          this.TableConfigComponent?.initialFunction(this.count);
          // this.flashMessage.successMessage("Get ALl Laywer Admin Details Successfully!!!")
        }
        // else {
        //   // this.spinner.hide();
        // }
      });
  }

  //Page change events
  page(value: any) {
    this.currentPage = value.page;
    this.itemsPerPage = Number(value.item);
    this.searchData['page'] = this.currentPage;
    this.searchData['items_per_page'] = this.itemsPerPage;
    this.getAccountsDepartmentByPagination();
  }

  // Call Function based on action click's in table
  actionOutput(event: any) {
    console.log(event);
    // if (event.action == 'Edit') {
    //   this.editLawyerAdmin(event.data);
    // } else if (event.action == 'Enable' || event.action == 'Disable') {
    //   this.enabledisableLawyerAdmin(event.data);
    // } else if (event.action == 'Reset') {
    //   this.resetPasswordModalOpen(event.data)
    // }
  }

  addAccountsDepartment() {
    this.router.navigate(['superAdmin/accounts/add-new-account']);
  }

  //On search Police Department
  onSearch() {
    this.currentPage = 1;
    this.searchData = {
      page: this.currentPage,
      items_per_page: this.itemsPerPage,
      first_name: this.searchAccountsDepartmentForm.value.first_name
        ? this.searchAccountsDepartmentForm.value.first_name
        : '',
      last_name: this.searchAccountsDepartmentForm.value.last_name
        ? this.searchAccountsDepartmentForm.value.last_name
        : '',
      username: this.searchAccountsDepartmentForm.value.username
        ? this.searchAccountsDepartmentForm.value.username
        : '',
      email_id: this.searchAccountsDepartmentForm.value.email_id
        ? this.searchAccountsDepartmentForm.value.email_id
        : '',
      role_id: this.searchAccountsDepartmentForm.value.role_id
        ? this.searchAccountsDepartmentForm.value.role_id
        : '',
      police_department_id: this.searchAccountsDepartmentForm.value
        .police_department_id
        ? this.searchAccountsDepartmentForm.value.police_department_id
        : '',
    };
    this.getAccountsDepartmentByPagination();
  }

  //On reset Police Department Search
  resetSearch() {
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.searchAccountsDepartmentForm.patchValue({
      page: this.currentPage,
      items_per_page: this.itemsPerPage,
      first_name: '',
      last_name: '',
      username: '',
      email_id: '',
      role_id: '',
      police_department_id: '',
    });
    this.searchData = {
      page: this.currentPage,
      items_per_page: this.itemsPerPage,
      first_name: this.searchAccountsDepartmentForm.value.first_name
        ? this.searchAccountsDepartmentForm.value.first_name
        : '',
      last_name: this.searchAccountsDepartmentForm.value.last_name
        ? this.searchAccountsDepartmentForm.value.last_name
        : '',
      username: this.searchAccountsDepartmentForm.value.username
        ? this.searchAccountsDepartmentForm.value.username
        : '',
      email_id: this.searchAccountsDepartmentForm.value.email_id
        ? this.searchAccountsDepartmentForm.value.email_id
        : '',
      role_id: this.searchAccountsDepartmentForm.value.role_id
        ? this.searchAccountsDepartmentForm.value.role_id
        : '',
      police_department_id: this.searchAccountsDepartmentForm.value
        .police_department_id
        ? this.searchAccountsDepartmentForm.value.police_department_id
        : '',
    };
    this.getAccountsDepartmentByPagination();
  }
}
