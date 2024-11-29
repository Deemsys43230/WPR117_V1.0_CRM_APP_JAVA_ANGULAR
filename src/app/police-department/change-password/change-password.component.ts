import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceDepartmentDataService } from 'src/app/shared/api/police-department-data.service';
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';
import { AuthService } from 'src/app/shared/services/auth-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  policeImageUrl: string = '';
  police_name: any;
  public changePasswordForm: any;
  public changePasswordData: any;
  public isPasswordChanged: any = false;

  constructor(private router: Router, private fb: FormBuilder, private changePasswordService: AuthService, private flashMessageService: FlashMessageService, private policeDepartmentService: PoliceDepartmentDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializationForm();
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
      if (this.police_name) {
        this.getByNamePoliceDepartment();
      }
    });
  }

  initializationForm() {
    this.changePasswordForm = this.fb.group({
      current_password: ["", Validators.required],
      new_password: ["", Validators.required],
      confirm_new_password: ["", Validators.required],
    })
  }

  changePassword() {
    this.isPasswordChanged = true;
    if (this.changePasswordForm.valid) {
      this.changePasswordData = {
        "old_password": (this.changePasswordForm.value.current_password != undefined) ? this.changePasswordForm.value.current_password : "",
        "new_password": (this.changePasswordForm.value.new_password != undefined) ? this.changePasswordForm.value.new_password : "",
        "confirm_password": (this.changePasswordForm.value.confirm_new_password != undefined) ? this.changePasswordForm.value.confirm_new_password : "",
        "account_id": (localStorage["account_id"] != undefined) ? localStorage["account_id"] : ""
      }
      this.changePasswordService.changePassword(this.changePasswordData).subscribe(res => {
        if (res.status) {
          this.flashMessageService.successMessage(res.msg, 2);
          this.router.navigate(['ohio/', this.police_name])
        } else {
          this.flashMessageService.successMessage(res.msg, 2);
        }
      })
    }
  }

  //get by name
  getByNamePoliceDepartment() {
    this.policeDepartmentService?.getByNamePoliceDepartmentDetails(this.police_name).subscribe(res => {
      if (res.status) {
        this.policeImageUrl = res.data.url;
      }
    })
  }

  // Navigate back to reports list
  backToReportList() {
    this.router.navigate(['reports/', this.police_name])
  }

  // Cancel method
  cancel() {
    this.router.navigate(['reports/', this.police_name])
  }
}
