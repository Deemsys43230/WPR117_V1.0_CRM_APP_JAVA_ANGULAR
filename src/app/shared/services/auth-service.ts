import { Injectable } from '@angular/core';
import { AuthDataService } from "../api/auth-data-service"

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private authDataService: AuthDataService) { }

    // Login Data
    public login(loginData: any) {
        return this.authDataService.login(loginData);
    }
     // Forget Password
     public ForgetPassword(data: any) {
        return this.authDataService.ForgetPassword(data);
    }
      // Change Password
      public changePassword(data:any) {
        return this.authDataService.changePassword(data);
    }
      // Change Password
      public updatePassword(data:any) {
        return this.authDataService.updatePassword(data);
    }
}