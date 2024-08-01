import { Component, OnInit ,  } from '@angular/core';
import { TableData } from 'src/app/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public table_data : TableData;

  constructor(private router: Router){}

  ngOnInit(): void {
   this.getData();
  }
  getData(){
    const department_data = [{
      department_id: 1,
      image_url: "",
      name: "Boardman",
      country: "Mahoning",
      code: "RR_BM_",
      login_link: "http://localhost:8080/CRMboardman",
      search_link: "http://localhost:8080/CRMboardman_search"
    },
    {
      department_id: 2,
      image_url: "",
      name: "Fairborn",
      country: "Greene",
      code: "RR_FB_",
      login_link: "http://localhost:8080/CRMboardman",
      search_link: "http://localhost:8080/CRMboardman_search"
    }]
    const count = department_data.length

    this.table_data = {
      data: department_data,
      totalCount: count,
      labelName : ['name', 'country'],
      tableHeading: ['Name', 'Country','Actions'],
      actionButton: ['Enable', 'Disable','Edit']
    }
  }

  addDepartment(){
    this.router.navigate(['superAdmin/department/add-department'])
  }

  onSearch(){
  }

  resetSearch(){
  }








}
