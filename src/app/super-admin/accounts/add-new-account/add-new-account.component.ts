import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { RoleService } from 'src/app/shared/services/role.service';
import { AddNewAccountService } from 'src/app/shared/services/add-new-account-service';

@Component({
  selector: 'app-add-new-account',
  templateUrl: './add-new-account.component.html',
  styleUrls: ['./add-new-account.component.scss']
})
export class AddNewAccountComponent implements OnInit {
  accountForm: FormGroup;
  public roleList: any[] = [];
  public departmentList: any[] = [];
  public account_id:any

  constructor(private fb: FormBuilder, private router: Router, private activateRoute: ActivatedRoute, private addNewAccountService: AddNewAccountService, private policeDepartmentService: PoliceDepartmentService,
    private roleService: RoleService, private getByIdAccountData: AddNewAccountService, private updateAccountData: AddNewAccountService) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllDepartments();
    this.initializeAccountForm();
    this.activateRoute.params.subscribe(param => {
      this.account_id = param['id']
    })
    if(this.account_id){
      this.getByIdAccount();
    }
  }

   //Initialize form
   initializeAccountForm(){
     this.accountForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      role_id: ['', Validators.required],
      police_department_id: ['', Validators.required]
    });
   }

   onSubmit(): void {
    if (this.accountForm.valid) {  
      if (this.account_id) {
        //Update existing account
        this.updateAccountData.updateAccountData(this.account_id, this.accountForm.value).subscribe({
          next: () => {
            alert('Account updated successfully');
            this.router.navigate(['superAdmin/accountsDepartment/']);
          },
          error: (err) => {
            console.error('Error updating account:', err);
            alert('Error updating account');
          }
        });
      } else {
        //Create new account
        this.addNewAccountService.addNewAccountData(this.accountForm.value).subscribe({
          next: () => {
            alert('Account created successfully');
            this.router.navigate(['superAdmin/accountsDepartment/']);
          },
          error: (err) => {
            console.error('Error creating account:', err);
            alert('Error creating account');
          }
        });
      }
    } 
  }

  //get the role of the admin
  getAllRoles() {
    this.roleService.getAllRoles().subscribe((res) => {
      if (res.status) {
        this.roleList = [];
        let roles = res.data;
        roles.forEach(
          (element) => {
            let data = {
              role_id: element.role_id,
              role: element.role,
            };
            this.roleList.push(data);
            // this.selectedMemberRole = this.roleList[0].role_id
          },
          (error) => {
            console.error('Error fetching roles:', error);
          }
        );
        // this.searchAccessmanagementForm.patchValue({
        //   role_id: this.selectedRole
        // })
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
          this.departmentList = [];
          let departments = res.data;
          departments.forEach(
            (element) => {
              let data = {
                department_id: element.department_id,
                name: element.name,
              };
              this.departmentList.push(data);
            },
            (error) => {
              console.error('Error fetching roles:', error);
            }
          );
        }
      });
  }

  //get by id account
  getByIdAccount() {
    this.getByIdAccountData.getByIdAccountData(this.account_id).subscribe((res) => {
      this.accountForm.patchValue({...res.data,role_id:res.data.role})
    })
  }

  back() {
    this.router.navigate(['superAdmin/accountsDepartment/'])
  }
}
