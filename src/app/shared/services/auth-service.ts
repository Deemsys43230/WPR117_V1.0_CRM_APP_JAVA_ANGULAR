import { Injectable } from '@angular/core';
import { AuthDataService } from "../api/auth-data-service"
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private router: Router,private authDataService: AuthDataService) { }

    // Login Data
    public login(loginData: any) {
        return this.authDataService.login(loginData);
    }

    //Refresh Token
    public refreshToken(refresh_token: any){
        return this.authDataService.refreshToken(refresh_token);
    }
 
      // Change Password
      public changePassword(data:any) {
        return this.authDataService.changePassword(data);
    }

    //Reset Password
    public resetPassword(data: any) {
        return this.authDataService.resetPassword(data);
    }

    //Check for Authenticated Role
    public isAuthenticated(): boolean {
        return localStorage.getItem('role') !== null;
    }

    //Logout user
    public logout(){
        localStorage.clear();
        this.router.navigateByUrl('/auth/login');
    }
}