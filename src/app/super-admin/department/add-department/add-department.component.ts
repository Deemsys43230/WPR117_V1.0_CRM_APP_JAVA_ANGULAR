import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent {


constructor(private router: Router){}

  back(){
    this.router.navigate(['superAdmin/policeDepartment/'])
  }

}
