import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoliceDepartmentDataService } from 'src/app/shared/api/police-department-data.service';

@Component({
  selector: 'app-police-department-header',
  templateUrl: './police-department-header.component.html',
  styleUrls: ['./police-department-header.component.scss']
})
export class PoliceDepartmentHeaderComponent implements OnInit, OnDestroy {
  policeImageUrl: any;
  police_name: any | string;
  isToggled: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(private activatedRoute: ActivatedRoute, private policeDepartmentService: PoliceDepartmentDataService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
      if (this.police_name) {
        this.getByNamePoliceDepartment();
      }
    });
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('police-sidebar-toggled');
    }
  }

  toggleSidebar(): void {
    this.isToggled = !this.isToggled;
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('police-sidebar-toggled', this.isToggled);
    }
  }

  closeSidebar(): void {
    this.isToggled = false;
    if (typeof document !== 'undefined') {
      document.body.classList.remove('police-sidebar-toggled');
    }
  }

  //get by name
  getByNamePoliceDepartment() {
    this.policeDepartmentService?.getByNamePoliceDepartmentDetails(this.police_name).subscribe(res => {
      if (res.status) {
        this.policeImageUrl = res.data.url;
      }
    })
  }

}
