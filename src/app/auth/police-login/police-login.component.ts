import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceDepartmentDataService } from 'src/app/shared/api/police-department-data.service';
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';
import { AuthService } from 'src/app/shared/services/auth-service';

@Component({
  selector: 'app-police-login',
  templateUrl: './police-login.component.html',
  styleUrls: ['./police-login.component.scss']
})
export class PoliceLoginComponent implements OnInit {
  policeImageUrl: string = '';
  police_name: any;
  public passwordHidden: boolean = false;
  public loginForm!: FormGroup;
  public isFormSubmitted: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private policeDepartmentService: PoliceDepartmentDataService, private router: Router, private activatedRoute: ActivatedRoute, private flashMessageService: FlashMessageService) { }

  //ngOnInit
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
      if (this.police_name) {
        this.getByNamePoliceDepartment();
      }
    });
    this.intializeLoginForm();
    localStorage.clear();
  }

  //intialize Login Form
  intializeLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  //get by name
  getByNamePoliceDepartment() {
    this.policeDepartmentService.getByNamePoliceDepartmentDetails(this.police_name).subscribe(res => {
      if (res.status) {
        this.policeImageUrl = res.data.url;
      }
    })
  }

  //show password
  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }

  //Login and set data to local storage
  login() {
    this.isFormSubmitted = true;
    var data = {
      "username": this.loginForm.value.username,
      "password": this.loginForm.value.password,
    }
    if (this.loginForm.valid) {
      this.authService.login(data).subscribe((res) => {
        if (res.status) {
          localStorage.setItem('Authorization-Token', res.access_token);
          localStorage.setItem('Refresh-Token', res.refresh_token);
          localStorage.setItem('userName', res.userDetails.username)
          localStorage.setItem('user_id', res.userDetails.user)
          localStorage.setItem('role', res.roleName);
          localStorage.setItem('role_id', res.role_id);
          this.flashMessageService.successMessage("Successfully Login !", 2);
          this.navigateBasedOnRole(res);
        } else {
          this.flashMessageService.errorMessage('Failed Incorrect Password', 2);
        }
      });
    }
  }

  //navigation based on role
  navigateBasedOnRole(LoginData: any) {
    if (LoginData.roleName === "ROLE_SUPER_ADMIN") {
      this.router.navigate(['superAdmin/dashboard']);
    }
    if (LoginData.roleName === "ROLE_USER") {
      this.router.navigate(['reports/', this.police_name]);
    }
  }
}
