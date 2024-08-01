import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-account',
  templateUrl: './add-new-account.component.html',
  styleUrls: ['./add-new-account.component.scss']
})
export class AddNewAccountComponent {

  constructor(private router: Router) {}

  back() {
    this.router.navigate(['superAdmin/accountsDepartment/'])
  }
}
