import { DatePipe, formatDate } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { TableData } from 'src/app/constants';
import { CountyService } from 'src/app/shared/services/county.service';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { ReportsService } from 'src/app/shared/services/reports.service';
import { TableConfigComponent } from 'src/app/shared/table-config/table-config.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [DatePipe]
})
export class ReportsComponent implements OnInit {
  @ViewChild(TableConfigComponent) TableConfigComponent:
    | TableConfigComponent
    | undefined;

  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;  // Reference to BsDatepickerDirective instance
  @ViewChild(BsDatepickerDirective, { static: false }) datepickerForFrom: BsDatepickerDirective;
  @ViewChild(BsDatepickerDirective, { static: false }) datepickerForTo: BsDatepickerDirective;

  public table_data: TableData;
  public searchData: any;
  public currentPage: any = 1;
  public items_per_page = 5;
  public searchValue: any;
  public callChildComponent: boolean | undefined;
  public searchReportsForm: FormGroup;
  public departmentList: any;
  public countyList: any;
  today: Date;
  minimumDate: Date;
  bsToDate: Date;
  isFromDateError: boolean = false;
  isToDateError: boolean = false;
  public reportType: number = 2;

  constructor(private router: Router, private fb: FormBuilder, private spinner: NgxSpinnerService, private reportsService: ReportsService, private policeDepartmentService: PoliceDepartmentService, private countyService: CountyService, private datePipe: DatePipe) {
    this.today = new Date();
  }

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
      policeDepartmentId: [''],
      countyId: [''],
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
      searchType: 1,
      reportType: this.reportType,
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
    const rawDate = this.searchReportsForm.value.crashDate;
    let formattedDate = "";
    if (rawDate) {
      const crashDate = new Date(rawDate); // Ensure it's a Date object
      formattedDate = this.datePipe.transform(crashDate, 'MM-dd-yyyy') || ""; // Format date
    }

    const rawFromDate = this.searchReportsForm.value.addedOnFromDate;
    let formattedFromDate = "";
    if (rawFromDate) {
      const addedOnFromDate = new Date(rawFromDate); // Ensure it's a Date object
      formattedFromDate = this.datePipe.transform(addedOnFromDate, 'MM-dd-yyyy') || ""; // Format date
    }

    const rawToDate = this.searchReportsForm.value.addedOnToDate;
    let formattedToDate = "";
    if (rawToDate) {
      const addedOnToDate = new Date(rawToDate); // Ensure it's a Date object
      formattedToDate = this.datePipe.transform(addedOnToDate, 'MM-dd-yyyy') || ""; // Format date
    }
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.items_per_page ? this.items_per_page : 5,
      addedOnFromDate: formattedFromDate ? formattedFromDate : "",
      addedOnToDate: formattedToDate ? formattedToDate : "",
      countyId: (this.searchReportsForm?.value.countyId) ? this.searchReportsForm.value.countyId : "",
      crashDate: formattedDate ? formattedDate : "",
      policeDepartmentId: (this.searchReportsForm?.value.policeDepartmentId) ? this.searchReportsForm.value.policeDepartmentId : "",
      location: (this.searchReportsForm?.value.location) ? this.searchReportsForm.value.location : "",
      reportNumber: (this.searchReportsForm?.value.reportNumber) ? this.searchReportsForm.value.reportNumber : "",
      reportType: this.reportType,
      searchType: 1,
      accountId: "0",
    };
    this.spinner.show();
    var reportsData: any[] = [];
    this.reportsService.getReportsByPagination(this.searchData).subscribe((res) => {
      if (res.status) {
        this.spinner.hide();
        this.callChildComponent = true;
        res.data.forEach((ele: any) => {
          reportsData.push({
            crash_date: ele.crash_date,
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
      searchType: 1,
      reportType: this.searchReportsForm.value.department !== "" || this.searchReportsForm.value.county !== "" ? 1 : 2,
      crashDate: this.searchReportsForm.value.crashDate ? this.adjustDateToLocal(this.searchReportsForm.value.crashDate) : "",
      reportNumber: this.searchReportsForm.value.reportNumber || "",
      location: this.searchReportsForm.value.location || "",
      policeDepartmentId: (this.searchReportsForm.value.policeDepartmentId) ? this.searchReportsForm.value.policeDepartmentId : "",
      countyId: (this.searchReportsForm.value.countyId) ? this.searchReportsForm.value.countyId : "",
      addedOnFromDate: this.searchReportsForm.value.addedOnFromDate ? this.adjustDateToLocal(this.searchReportsForm.value.addedOnFromDate) : "",
      addedOnToDate: this.searchReportsForm.value.addedOnToDate ? this.adjustDateToLocal(this.searchReportsForm.value.addedOnToDate) : "",
    };
    this.getReportsByPagination();
  }

  //On Reset
  resetSearch() {
    this.searchValue = {
      currentPage: 1,
      itemsPerPage: 5,
    };
    this.currentPage = 1;
    this.items_per_page = 5;
    this.setupSearchData()
    this.getReportsByPagination()
    this.searchReportsForm.reset(
      { countyId: "", policeDepartmentId: "" });
    this.TableConfigComponent?.initialFunction(this.table_data?.totalCount);
  }

  //To open date picker
  openDatePicker(obj) {
    if (obj) {
      obj.show();
    }
  }

  //To handle added on from date and to date fields
  onDateInput(event) {
    this.isFromDateError = false; // Reset validation flags
    this.isToDateError = false;
    this.minimumDate = event;
    this.searchReportsForm.patchValue({
      addedOnToDate: ''
    });
  }

  onDateInputTo(event) {
    this.isToDateError = false;
  }
}
