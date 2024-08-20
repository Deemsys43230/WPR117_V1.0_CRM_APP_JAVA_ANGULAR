import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableData } from 'src/app/constants';
import { AccountsDepartmentService } from 'src/app/shared/services/accounts-department-service';
import { TableConfigComponent } from 'src/app/shared/table-config/table-config.component';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { RoleService } from 'src/app/shared/services/role.service';
import { AuthService } from 'src/app/shared/services/auth-service';
import { NgxSpinnerService } from "ngx-spinner";
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
  public roleList: any[] = [];
  public departmentList: any[] = [];
  public searchValue: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountsDepartmentService: AccountsDepartmentService,
    private policeDepartmentService: PoliceDepartmentService,
    private roleService: RoleService,
    private enableDisableAccountsDepartment: AccountsDepartmentService,
    private resetPassword: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initializationSearchAccessManagementForm();
    this.setupSearchData()
    this.getAllRoles();
    this.getAllDepartments();
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

   // setup Search Data
  setupSearchData() {
    this.searchData = {
      page: this.currentPage,
      items_per_page: this.itemsPerPage,
      first_name: '',
      last_name: '',
      username: '',
      email_id: '',
      role_id: '',
      police_department_id: '',
    }
  }

  //To Get all Account department details
  getAccountsDepartmentByPagination() {
    this.spinner.show();
    var policeData = [];
    this.accountsDepartmentService.getAccountsDepartmentDetailsByPagination(this.searchData).subscribe((res) => {
      if (res.status) {
        this.spinner.hide();
        this.callChildComponent = true;
        const requests = res.data.map((ele: any) => {
          return this.policeDepartmentService.getByIdPoliceDepartmentDetails(ele.police_department_id).toPromise()
            .then((val) => {
              if (val.status) {
                return {
                  account_id: ele.account_id,
                  email_id: ele.email_id,
                  first_name: ele.first_name,
                  last_name: ele.last_name,
                  username: ele.username,
                  role_id: ele.role_id,
                  status: ele.status,
                  police_department_id: val.data.name,
                  is_enable: ele.is_enable
                };
              }
              return undefined;
            })
            .catch(() => {
              return undefined;
            });
        });
        Promise.all(requests)
          .then((results) => {
            policeData.push(...results.filter(result => result !== undefined));
          })
          .catch((error) => {
            console.error('Error occurred:', error);
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
          actionButton: ['Edit', 'Enable', 'Disable', 'Reset Password'],
        };
        this.TableConfigComponent?.initialFunction(res.count);
      }
      else {
        this.spinner.hide();
      }
    });
  }

  //get the role of the admin
  getAllRoles() {
    this.roleService.getAllRoles().subscribe((res) => {
      if (res.status) {
        this.roleList = res.data;
      }
    });
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
    if (event.action == 'Edit') {
      console.log(event.data)
      this.handleEdit(event.data);
    } else if (event.action == 'Enable' || event.action == 'Disable') {
      this.handleEnableOrDisable(event.data);
    } else if (event.action == 'Reset Password') {
      this.handleResetPassword(event.data);
    }
  }

  private handleEdit(data: any) {
    this.router.navigate(['/superAdmin/accountsDepartment/add-new-account/' + data.account_id]);
  }

  private handleEnableOrDisable(data: any) {
    const newIsEnable = data.is_enable === 0 ? 1 : 0;
    const payload = {
      is_enable: newIsEnable
    };
    this.enableDisableAccountsDepartment.enableDisableAccountsDepartment(data.account_id, payload).subscribe(
      (response) => {
        if (response.status) {
          this.getAccountsDepartmentByPagination();
        }
      },
    );
  }

  private handleResetPassword(data: any) {
    const payload = {
      account_id: data.account_id
    };
    this.resetPassword.resetPassword(payload).subscribe((response) => {
      if (response.status) {
        alert('Password reset successfully')
      }
    })
  }

  addAccountsDepartment() {
    this.router.navigate(['superAdmin/accountsDepartment/add-new-account']);
  }

  //On search Police Department
  onSearch() {
    this.currentPage = 1;
    this.searchData = {
      page: this.currentPage,
      items_per_page: this.itemsPerPage,
      first_name: this.searchAccountsDepartmentForm.value.first_name ? this.searchAccountsDepartmentForm.value.first_name : '',
      last_name: this.searchAccountsDepartmentForm.value.last_name ? this.searchAccountsDepartmentForm.value.last_name : '',
      username: this.searchAccountsDepartmentForm.value.username ? this.searchAccountsDepartmentForm.value.username : '',
      email_id: this.searchAccountsDepartmentForm.value.email_id? this.searchAccountsDepartmentForm.value.email_id : '',
      role_id: this.searchAccountsDepartmentForm.value.role_id ? this.searchAccountsDepartmentForm.value.role_id : '',
      police_department_id: this.searchAccountsDepartmentForm.value.police_department_id ? this.searchAccountsDepartmentForm.value.police_department_id : '',
    };
    this.getAccountsDepartmentByPagination();
  }

  //On reset Police Department Search
  resetSearch() {
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.searchAccountsDepartmentForm.reset({
      role_id: '',
      police_department_id: '',
    });
    this.setupSearchData()
    this.getAccountsDepartmentByPagination();
  }
}
