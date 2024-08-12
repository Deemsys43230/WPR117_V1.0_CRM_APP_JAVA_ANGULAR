import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';
import { AuthService } from 'src/app/shared/services/auth-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;
  public isChangePasswordFormSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private flashMessage: FlashMessageService) { }

  ngOnInit(): void {
    this.initializationChangePasswordForm()
  }

  //Setup Change Password Form
  initializationChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      current_password: ["", Validators.required],
      new_password: ["", Validators.required],
      confirm_new_password: ["", Validators.required]
    });
  }

  //On Submit Form
  onSubmit() {
    if (this.changePasswordForm.valid) {
      const currentPassword = this.changePasswordForm.value.current_password;
      const newPassword = this.changePasswordForm.value.new_password;
      const confirmNewPassword = this.changePasswordForm.value.confirm_new_password;

      if (newPassword !== confirmNewPassword) {
        this.flashMessage.errorMessage("New Password and Confirm Password do not match.", 2);
        this.changePasswordForm.controls["confirm_new_password"].reset()
        return;
      }

      if (newPassword === currentPassword) {
        this.flashMessage.errorMessage("New Password cannot be the same as the Current Password.", 2);
        this.changePasswordForm.controls["new_password"].reset()
        this.changePasswordForm.controls["confirm_new_password"].reset()
        return;
      }

      const data = {
        "old_password": currentPassword,
        "new_password": newPassword,
        "confirm_password": confirmNewPassword,
        "account_id": "59f16a5acc59432b69dafbe90ca6137"
      };

      this.authService.changePassword(data).subscribe(res => {
        if (res.status) {
          this.flashMessage.successMessage(res.msg, 2);
        } else {
          this.flashMessage.errorMessage(res.msg, 2);
        }
      });
    }
  }

  //On Back
  back() {
    this.router.navigate(['superAdmin/dashboard/'])
  }
}
