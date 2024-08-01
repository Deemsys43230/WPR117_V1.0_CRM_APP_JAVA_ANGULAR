import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableData } from 'src/app/constants';
@Component({
  selector: 'app-accounts-component',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  public table_data : TableData;

  constructor(private router: Router){}

  ngOnInit(): void {
   this.getData();
  }

  getData(): void {
    const department_data = [{
      department_id: 1,
      image_url: "",
      firstname: "Boardman",
      lastname: "Dcole",
      username: "Admin",
      emailid: "dcole@gmail.com",
      policedepartment: "Boardman",
      code: "RR_BM_",
      login_link: "http://localhost:8080/CRMboardman",
      search_link: "http://localhost:8080/CRMboardman_search"
    },
    {
      department_id: 2,
      image_url: "",
      firstname: "Fairborn",
      lastname: "Blake",
      username: "John",
      emailid: "blake@gmail.com",
      policedepartment: "Fairborn",
      code: "RR_FB_",
      login_link: "http://localhost:8080/CRMboardman",
      search_link: "http://localhost:8080/CRMboardman_search"
    }]
    const count = department_data.length

    this.table_data = {
      data: department_data,
      totalCount: count,
      labelName : ['firstname', 'lastname', 'username', 'emailid', 'policedepartment'],
      tableHeading: ['First Name', 'Last Name', 'User Name', 'Email Id', 'Police Department', 'Actions'],
      actionButton: ['Enable', 'Disable','Edit']
    };
  }

  addAccountsDepartment() {
    this.router.navigate(['superAdmin/accounts/add-new-account'])
  }

  onSearch(){
  }

  resetSearch(){
  }
}
