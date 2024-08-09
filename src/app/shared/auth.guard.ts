import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const role = localStorage.getItem("role");
    if (isAuthenticated) {
      if(role == "ROLE_SUPER_ADMIN"){
        return true;
      }
      else{
        this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }


}