import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service';
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public loginForm!: FormGroup;
  public errorMessage: any;
  public isFormSubmitted: boolean = false;
  public role: any;
  public passwordHidden: boolean = true;
  public roleData: any = [];


  constructor(private authService: AuthService, private fb: FormBuilder, public router: Router, private flashMessageService: FlashMessageService){}

  ngOnInit(): void {
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
            localStorage.setItem('account_id',res.account_id);
            localStorage.setItem('userName',res.userDetails.username)
            localStorage.setItem('user_id',res.userDetails.user)
            localStorage.setItem('role', res.roleName);
            localStorage.setItem('role_id', res.role_id);
            this.flashMessageService.successMessage("Successfully Login !", 2);
            this.navigateBasedOnRole(res);
          } else {
            this.loginForm.controls['password'].reset();
            this.isFormSubmitted = false
            this.flashMessageService.errorMessage('Failed Incorrect Password', 2);
          }
        });
      }
    }

     //show password
  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }

      //navigation based on role
  navigateBasedOnRole(LoginData: any) {
    if (LoginData.roleName === "ROLE_SUPER_ADMIN") {
      this.router.navigate(['superAdmin/dashboard']);
    }   
  }


}
