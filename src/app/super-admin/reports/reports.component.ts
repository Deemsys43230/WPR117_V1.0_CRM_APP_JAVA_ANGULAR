import { formatDate } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TableData } from 'src/app/constants';
import { CountyService } from 'src/app/shared/services/county.service';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { ReportsService } from 'src/app/shared/services/reports.service';
import { TableConfigComponent } from 'src/app/shared/table-config/table-config.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild(TableConfigComponent) TableConfigComponent:
    | TableConfigComponent
    | undefined;

  public table_data: TableData;
  public searchData: any;
  public currentPage: any = 1;
  public items_per_page = 5;
  public searchValue: any;
  public callChildComponent: boolean | undefined;
  public searchReportsForm: FormGroup;
  public departmentList: any;
  public countyList: any;

  constructor(private router: Router, private fb: FormBuilder, private spinner: NgxSpinnerService, private reportsService: ReportsService, private policeDepartmentService: PoliceDepartmentService, private countyService: CountyService,) { }

  ngOnInit(): void {
    this.initializeSearchReportsForm();
    this.setupSearchData()
    this.getAllPoliceDepartment()
    this.getAllCounty()
    this.getReportsByPagination()
  }

  //Setup search Form
  initializeSearchReportsForm() {
    this.searchReportsForm = this.fb.group({
      crashDate: [''],
      reportNumber: [''],
      location: [''],
      department: [''],
      county: [''],
      addedOnFromDate: [''],
      addedOnToDate: ['']
    });
  }

  //Setup Search Data
  setupSearchData() {
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.items_per_page,
      accountId: "0",
      firstName: "",
      lastName: "",
      searchType: 1,
      reportType: 2,
      crashDate: "",
      reportNumber: "",
      location: "",
      policeDepartmentId: "",
      countyId: "",
      addedOnFromDate: "",
      addedOnToDate: ""
    };
  }

  //To Get all Police department details
  getReportsByPagination() {
    this.spinner.show();
    var reportsData: any[] = [];
    this.reportsService.getReportsByPagination(this.searchData).subscribe((res) => {
      if (res.status) {
        this.spinner.hide();
        this.callChildComponent = true;
        res.data.forEach((ele: any) => {
          reportsData.push({
            crash_date: this.convertGMTDateToMMDDYYYY(ele.crash_date).date,
            report_number: ele.report_number,
            location: ele.location,
            no_of_occupants: ele.no_of_occupants,
            police_department: ele.police_department,
            file_name: ele.file_name
          });
        });
        this.table_data = {
          data: reportsData,
          totalCount: res.total,
          labelName: ['crash_date', 'report_number', 'location', 'no_of_occupants', 'police_department'],
          tableHeading: ['Crash Date', 'Report Number', 'Location', 'No. of Occupants', 'Department', 'Actions'],
          actionButton: ['View Report File'],
        };
        this.TableConfigComponent?.initialFunction(res.total);
      }
      else {
        this.spinner.hide();
      }
    });
  }

  //To Get All Police Department
  getAllPoliceDepartment() {
    var data = {
      page: 1,
      items_per_page: "",
      name: "",
      county: ""
    };
    this.policeDepartmentService.getPoliceDepartmentDetailsByPagination(data).subscribe(res => {
      if (res.status) {
        this.departmentList = [];
        let departments = res.data;
        departments.forEach(ele => {
          let data = {
            department_id: ele.department_id,
            name: ele.name
          }
          this.departmentList.push(data);
        });
      }
    })
  }

  //get All County
  getAllCounty() {
    var data = {};
    this.countyService.getAllCounty(data).subscribe((res) => {
      if (res.status) {
        this.countyList = [];
        let counties = res.data;
        counties.forEach((element) => {
          let data = {
            county_id: element.county_id,
            county_name: element.name,
          };
          this.countyList.push(data);
        });
      }
    });
  }

  // Pagination methods Starts
  //Page change events
  page(value: any) {
    this.currentPage = value.page;
    this.items_per_page = Number(value.item);
    this.searchData["itemsPerPage"] = this.items_per_page;
    this.searchData["page"] = this.currentPage;
    this.getReportsByPagination();
  }


  // // Call Function based on action click's in table
  actionOutput(event: any) {
    const fileUrl = event.data.file_name
    if (fileUrl) {
      window.open(fileUrl, '_blank'); // Opens the link in a new tab
    }
  }
  // Pagination methods Ends

  // Convert GMT Date into MM/DD/YYYY Format For Date And Time 
  convertGMTDateToMMDDYYYY(gmtDate) {
    let date = new Date(gmtDate);
    let month = (date.getUTCMonth() + 1).toString();
    let day = date.getUTCDate().toString();
    let year = date.getUTCFullYear();

    month = month.padStart(2, '0');
    day = day.padStart(2, '0');

    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes().toString();
    let seconds = date.getUTCSeconds().toString();

    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    let hoursStr = hours.toString().padStart(2, '0');
    minutes = minutes.padStart(2, '0');
    seconds = seconds.padStart(2, '0');

    return { date: `${month}/${day}/${year}`, time: ` ${hoursStr}:${minutes} ${period}` }
  }

  //Change Date for Date Pickers
  adjustDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  //On Serach
  onSearch() {
    this.currentPage = 1;
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.items_per_page,
      accountId: "0",
      firstName: "",
      lastName: "",
      searchType: 1,
      reportType: this.searchReportsForm.value.department !== "" || this.searchReportsForm.value.county !== "" ? 1 : 2,
      crashDate: this.searchReportsForm.value.crashDate ? this.adjustDateToLocal(this.searchReportsForm.value.crashDate) : "",
      reportNumber: this.searchReportsForm.value.reportNumber || "",
      location: this.searchReportsForm.value.location || "",
      policeDepartmentId: Number(this.searchReportsForm.value.department) || "",
      countyId: Number(this.searchReportsForm.value.county) || "",
      addedOnFromDate: this.searchReportsForm.value.addedOnFromDate ? this.adjustDateToLocal(this.searchReportsForm.value.addedOnFromDate) : "",
      addedOnToDate: this.searchReportsForm.value.addedOnToDate ? this.adjustDateToLocal(this.searchReportsForm.value.addedOnToDate) : "",
    };
    this.getReportsByPagination();
  }

  //On Reset
  resetSearch() {
    this.currentPage = 1;
    this.items_per_page = 5;
    this.searchReportsForm.reset({ county: '', department: '' });
    this.setupSearchData()
    this.getReportsByPagination()
  }
}
