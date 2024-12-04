import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { CountyService } from 'src/app/shared/services/county.service';
import { FormBuilder } from '@angular/forms';
import { OccupantsService } from 'src/app/shared/services/occupants-service';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { CrashSeverity, Injuries, ItemsPerPage, SeatingPosition } from 'src/app/constants';
import { NgxSpinnerService } from "ngx-spinner";
import { CrashReportService } from 'src/app/shared/services/crash-report-service';
import { DatePipe } from '@angular/common';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-occupants',
  templateUrl: './occupants.component.html',
  styleUrls: ['./occupants.component.scss'],
  providers: [DatePipe],
})
export class OccupantsComponent implements OnInit {
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;  // Reference to BsDatepickerDirective instance
  @ViewChild(BsDatepickerDirective, { static: false }) datepickerForFrom: BsDatepickerDirective;
  @ViewChild(BsDatepickerDirective, { static: false }) datepickerForTo: BsDatepickerDirective;

  public searchData: any;
  public searchOccupantsForm: any;
  public currentPage: any = 1;
  public countyList: any[] = [];
  public occupantsData: any = [];
  public departmentList: any[] = [];
  public paginatedData: any[] = [];
  public totalPages: number = 0;
  public count: number;
  public startIndex: number;
  public endIndex: number;
  public page = 1;
  public ItemsPerPage: any = [];
  public pageValue: number = 5;
  public pagebutton: boolean = false;
  public searchPage: number;
  public isPageAvailable: boolean;
  public pages: any[] = [];
  public occupantDetail: any = [];
  public error: boolean = false;
  public crashReport: any = null;
  selectedItemsPerPage = 5;
  public reportType: number = 2;
  today: Date;
  minimumDate: Date;
  bsToDate: Date;
  isFromDateError: boolean = false;
  isToDateError: boolean = false;
  occupants = [];
  reportData: any = {};
  crashSeverityOptions = CrashSeverity;
  injuries = Injuries;
  seatingPosition = SeatingPosition;

  @ViewChild('searchPageNumber') searchPageNumberInput!: ElementRef<HTMLInputElement>;

  @Input() search: any;

  @Output() pageNew = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private countyService: CountyService, private policeDepartmentService: PoliceDepartmentService, private occupantsService: OccupantsService, private spinner: NgxSpinnerService, private crashReportService: CrashReportService, private datePipe: DatePipe
  ) {
    this.ItemsPerPage = ItemsPerPage
  }
  ngOnInit() {
    this.today = new Date();
    this.initializationSearchOccupantsForm();
    this.getAllCounty();
    this.getAccountsDepartmentByPagination();
    this.setupSearchData();
    this.getAllOccupants();
  }

  // Initialization Search Occupants Form
  initializationSearchOccupantsForm() {
    this.searchOccupantsForm = this.fb.group({
      addedOnFromDate: "",
      addedOnToDate: "",
      countyId: "",
      crashDate: "",
      firstName: "",
      lastName: "",
      policeDepartmentId: "",
      location: "",
      reportNumber: "",
      reportType: this.reportType,
      searchType: 1
    })
  }

  //Setting up SearchData
  setupSearchData() {
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.pageValue,
      addedOnFromDate: "",
      addedOnToDate: "",
      countyId: "",
      crashDate: "",
      firstName: "",
      lastName: "",
      policeDepartmentId: "",
      location: "",
      reportNumber: "",
      reportType: this.reportType,
      searchType: 1,
      accountId: "0",
    };
  }

  //To Get all Account department details
  getAccountsDepartmentByPagination() {
    this.spinner.show();
    var policeData: any[] = [];
    var policeDepData = { page: 1, items_per_page: "", name: "", county: "" };
    const departmentMap = new Map<number, string>();

    this.policeDepartmentService.getPoliceDepartmentDetailsByPagination(policeDepData).subscribe((res) => {
      if (res.status) {
        this.spinner.hide();
        this.departmentList = [];
        res.data.forEach(item => {
          departmentMap.set(item.department_id, item.name);
        });
        policeData = res.data.filter(item => departmentMap.has(item.department_id)).map(item => ({
          police_department_id: item.department_id,
          name: item.name
        }));
        res.data.forEach(element => {
          let data = {
            department_id: element.department_id,
            name: element.name,
          };
          this.departmentList.push(data);
        });
      } else {
        this.spinner.hide();
      }
    });
  }

  //Get All Occupants 
  getAllOccupants() {
    const rawDate = this.searchOccupantsForm.value.crashDate;
    let formattedDate = "";
    if (rawDate) {
      const crashDate = new Date(rawDate); // Ensure it's a Date object
      formattedDate = this.datePipe.transform(crashDate, 'MM-dd-yyyy') || ""; // Format date
    }

    const rawFromDate = this.searchOccupantsForm.value.addedOnFromDate;
    let formattedFromDate = "";
    if (rawFromDate) {
      const addedOnFromDate = new Date(rawFromDate); // Ensure it's a Date object
      formattedFromDate = this.datePipe.transform(addedOnFromDate, 'MM-dd-yyyy') || ""; // Format date
    }

    const rawToDate = this.searchOccupantsForm.value.addedOnToDate;
    let formattedToDate = "";
    if (rawToDate) {
      const addedOnToDate = new Date(rawToDate); // Ensure it's a Date object
      formattedToDate = this.datePipe.transform(addedOnToDate, 'MM-dd-yyyy') || ""; // Format date
    }
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.pageValue ? this.pageValue : 5,
      addedOnFromDate: formattedFromDate ? formattedFromDate : "",
      addedOnToDate: formattedToDate ? formattedToDate : "",
      countyId: (this.searchOccupantsForm?.value.countyId) ? this.searchOccupantsForm.value.countyId : "",
      crashDate: formattedDate ? formattedDate : "",
      firstName: (this.searchOccupantsForm?.value.firstName) ? this.searchOccupantsForm.value.firstName : "",
      lastName: (this.searchOccupantsForm?.value.lastName) ? this.searchOccupantsForm.value.lastName : "",
      policeDepartmentId: (this.searchOccupantsForm?.value.policeDepartmentId) ? this.searchOccupantsForm.value.policeDepartmentId : "",
      location: (this.searchOccupantsForm?.value.location) ? this.searchOccupantsForm.value.location : "",
      reportNumber: (this.searchOccupantsForm?.value.reportNumber) ? this.searchOccupantsForm.value.reportNumber : "",
      reportType: this.reportType,
      searchType: 1,
      accountId: "0",
    };
    this.occupantsService.getAllOccupants(this.searchData).subscribe(res => {
      if (res.status) {
        this.occupantDetail = res.data
        this.count = res.total;
        this.calculateTotalPages();
        this.setPaginatedData();
        this.togglePagination();
        this.pagesArray(this.currentPage, this.count, this.pageValue, 5)
        this.occupantsData = [];
        this.occupantDetail.forEach(data => {
          this.occupantsData.push({
            crashDate: data.crash_date,
            report_number: data.report_number,
            location: data.location,
            no_of_occupants: data.no_of_occupants,
            file_name: data.file_name,
            occupantsForms: data.occupantsForms,
            police_department: data.police_department,
            report_id: data.report_id
          });
        });
        if (this.occupantDetail.length == 0) {
          this.error = true;
        } else {
          this.error = false;
        }
      }
    })
  }

  // Convert GMT Date into MM/DD/YYYY Format For Date And Time 
  convertGMTDateToMMDDYYYY(gmtDate) {
    // Create a new Date object with the provided GMT date
    let date = new Date(gmtDate);
    // Extract the month, day, and year from the Date object
    let month = (date.getUTCMonth() + 1).toString(); // Convert to string after adding 1 to month
    let day = date.getUTCDate().toString(); // Convert day to string
    let year = date.getUTCFullYear();
    // Pad month and day with leading zeros if necessary using padStart
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');
    // Extract hours, minutes, and seconds from the Date object
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes().toString();
    let seconds = date.getUTCSeconds().toString();
    // Determine AM/PM and convert to 12-hour format
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    // Convert hours to string and pad if necessary
    let hoursStr = hours.toString().padStart(2, '0');
    minutes = minutes.padStart(2, '0');
    seconds = seconds.padStart(2, '0');
    // Construct the formatted date string in mm/dd/yyyy hh:mm:ss AM/PM format
    return { date: `${month}/${day}/${year}`, time: ` ${hoursStr}:${minutes} ${period}` }
  }

  adjustDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  //Get All County
  getAllCounty() {
    var data = {}
    this.countyService.getAllCounty(data).subscribe(res => {
      if (res.status) {
        this.countyList = []
        let counties = res.data;
        counties.forEach((element) => {
          let data = {
            "county_id": element.county_id,
            "county_name": element.name
          }
          this.countyList.push(data)
        });
      }
    })
  }

  //  Pagination Starts
  // Calculate total pages for pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.count / this.pageValue);
  }
  // Set  Data For Item Per Page In Table
  setPaginatedData() {
    this.startIndex = (this.currentPage - 1) * this.pageValue;
    this.endIndex = Math.min(this.startIndex + this.pageValue, this.count);
    this.occupantDetail.forEach(data => {
      this.occupantsData.push({
        crashDate: data.crash_date,
        report_number: data.report_number,
        location: data.location,
        no_of_occupants: data.no_of_occupants,
        file_name: data.file_name,
        occupantsForms: data.occupantsForms,
        police_department: data.police_department
      });
    })
  }

  //To change pagination based on search
  togglePagination() {
    if (this.pageValue >= this.count) {
      this.pagebutton = true;
      this.searchPage = null;
      this.isPageAvailable = false;
    } else {
      this.pagebutton = false;
    }
  }

  //  Route For  Next  Page   Number Function
  nextPage() {
    this.isPageAvailable = false;
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginatedData();
      this.searchPage = null;
      this.searchData["page"] = this.currentPage
      this.getAllOccupants();
    }
  }

  // Route For  Previous  Page   Number Function
  previousPage() {
    this.isPageAvailable = false;
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedData();
      this.searchPage = null;
      this.searchData["page"] = this.currentPage
      this.getAllOccupants();
    }
  }

  // Selected Page
  selectedPage(pageNum: any) {
    this.currentPage = pageNum;
    this.isPageAvailable = false;
    this.searchData["page"] = this.currentPage
    this.getAllOccupants();
    this.calculateTotalPages();
    this.searchPage = null;
    this.setPaginatedData();
  }

  goToPage(page: number) {
    this.isPageAvailable = false;
    this.currentPage = page;
    this.searchData["page"] = this.currentPage
    this.getAllOccupants();
    this.calculateTotalPages();
    this.searchPage = null;
    this.setPaginatedData();
  }

  // To Change The Item Per Page Number For  Pagination
  onChangePagination(event) {
    this.pageValue = parseInt(event.target.value)
    const totalPages = Math.ceil(this.count / this.pageValue); // Recalculate total pages
    this.currentPage = Math.min(this.currentPage, totalPages); // Adjust current page if it's beyond total pages
    this.searchData["itemsPerPage"] = this.pageValue
    this.getAllOccupants();
    // Reset error messages
    this.isPageAvailable = false;
    // Clear the search field
    const searchPageInput: HTMLInputElement | null = document.querySelector('.searchPage');
    if (searchPageInput) {
      searchPageInput.value = '';
    }
    // Ensure the page button state is reset
    this.pagebutton = false;
  }

  // To Get Array Of Page Numbers Based On Number Of Items Per Page And Pagination Range
  pagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
    var pages = [];
    var totalPages = Math.ceil(collectionLength / rowsPerPage);
    var halfWay = Math.ceil(paginationRange / 2);
    var position;

    if (currentPage <= halfWay) {
      position = 'start';
    } else if (totalPages - halfWay < currentPage) {
      position = 'end';
    } else {
      position = 'middle';
    }

    var ellipsesNeeded = paginationRange < totalPages;
    var i = 1;
    while (i <= totalPages && i <= paginationRange) {
      var pageNumber = this.calculatePageNumber(
        i,
        currentPage,
        paginationRange,
        totalPages
      );
      var openingEllipsesNeeded =
        i === 2 && (position === 'middle' || position === 'end');
      var closingEllipsesNeeded =
        i === paginationRange - 1 &&
        (position === 'middle' || position === 'start');
      if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
        pages.push('...');
      } else {
        pages.push(pageNumber);
      }
      i++;
    }
    this.pages = pages;
  }

  // To Calculate Page Number  Based On Current Page Number
  calculatePageNumber(
    i: number,
    currentPage: number,
    paginationRange: number,
    totalPages: number
  ): number {
    let halfWay = Math.ceil(paginationRange / 2);
    if (i === paginationRange) {
      return totalPages;
    } else if (i === 1) {
      return i;
    } else if (paginationRange < totalPages) {
      if (totalPages - halfWay < currentPage) {
        return totalPages - paginationRange + i;
      } else if (halfWay < currentPage) {
        return currentPage - halfWay + i;
      } else {
        return i;
      }
    } else {
      return i;
    }
  }

  // Search Page  Number Function
  searchPageno() {
    const value = this.searchPage;
    if (value > 0 && this.totalPages >= value) {
      this.isPageAvailable = false;
      this.currentPage = value;
      this.getAllOccupants();
    } else {
      this.isPageAvailable = true;
    }
  }
  // Pagination End
  // Search Function  For  Account
  onSearch() {
    this.isFromDateError = false; // Reset validation flags
    this.isToDateError = false;
    const fromDate = this.searchOccupantsForm.value.addedOnFromDate;
    const toDate = this.searchOccupantsForm.value.addedOnToDate;
    if (fromDate && !toDate) {
      this.isToDateError = true;
      return;
    }
    if (!fromDate && toDate) {
      this.isFromDateError = true;
      return;
    }
    this.currentPage = 1
    const rawDate = this.searchOccupantsForm.value.crashDate;
    let formattedDate = "";
    if (rawDate) {
      const crashDate = new Date(rawDate); // Ensure it's a Date object
      formattedDate = this.datePipe.transform(crashDate, 'MM-dd-yyyy') || ""; // Format date
    }

    const rawFromDate = this.searchOccupantsForm.value.addedOnFromDate;
    let formattedFromDate = "";
    if (rawFromDate) {
      const addedOnFromDate = new Date(rawFromDate); // Ensure it's a Date object
      formattedFromDate = this.datePipe.transform(addedOnFromDate, 'MM-dd-yyyy') || ""; // Format date
    }

    const rawToDate = this.searchOccupantsForm.value.addedOnToDate;
    let formattedToDate = "";
    if (rawToDate) {
      const addedOnToDate = new Date(rawToDate); // Ensure it's a Date object
      formattedToDate = this.datePipe.transform(addedOnToDate, 'MM-dd-yyyy') || ""; // Format date
    }

    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.pageValue,
      addedOnFromDate: formattedFromDate ? formattedFromDate : "",
      addedOnToDate: formattedToDate ? formattedToDate : "",
      countyId: (this.searchOccupantsForm.value.countyId) ? this.searchOccupantsForm.value.countyId : "",
      crashDate: formattedDate ? formattedDate : "",
      firstName: (this.searchOccupantsForm.value.firstName) ? this.searchOccupantsForm.value.firstName : "",
      lastName: (this.searchOccupantsForm.value.lastName) ? this.searchOccupantsForm.value.lastName : "",
      policeDepartmentId: (this.searchOccupantsForm.value.policeDepartmentId) ? this.searchOccupantsForm.value.policeDepartmentId : "",
      location: (this.searchOccupantsForm.value.location) ? this.searchOccupantsForm.value.location : "",
      reportNumber: (this.searchOccupantsForm.value.reportNumber) ? this.searchOccupantsForm.value.reportNumber : "",
      reportType: this.reportType,
      searchType: 1,
      accountId: "0",
    };
    this.occupantDetail.length <= this.pageValue ? this.pageValue = 5 : '';
    this.getAllOccupants();
  }

  // Reset  Search
  resetSearch() {
    this.isFromDateError = null;
    this.isToDateError = null;
    this.searchPage = null;
    this.isPageAvailable = false;
    this.selectedItemsPerPage = 5; // Reset dropdown value to 5
    this.searchOccupantsForm.reset(
      { countyId: "", policeDepartmentId: "" });
    this.setupSearchData();
    this.pageValue = 5;
    this.currentPage = 1;
    this.searchData["itemsPerPage"] = this.pageValue
    this.getAllOccupants();
    this.occupantDetail.length <= this.pageValue ? this.pageValue = 5 : '';
  }

  //Get Police Department details by id
  getCrashReportById(id) {
    this.crashReportService.getByIdCrashReport(id).subscribe(res => {
      if (res.status) {
        this.crashReport = {
          countyName: res.data.countyName,
          crash_date: res.data.crash_date,
          report_number: res.data.report_number,
          location: res.data.location,
          crash_severity: res.data.crash_severity,
        }
      }
    })
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
    this.searchOccupantsForm.patchValue({
      addedOnToDate: ''
    });
  }

  onDateInputTo(event) {
    this.isToDateError = false;
  }

  // Get by id
  getById(report_id) {
    this.occupantsService.getByIdCrashReport(report_id).subscribe(res => {
      this.occupants = res.data.occupants;
      this.reportData = res.data;
    })
  }

  // Get injury name
  getInjuryLabel(injuryValue: string): string {
    const injury = this.injuries.find(inj => inj.value === injuryValue);
    return injury ? injury.label : 'Unknown';
  }

  // Get seating position name
  getSeatingPositionLabel(seatingPositionValue: string): string {
    const seatingPosition = this.seatingPosition.find(sp => sp.value === seatingPositionValue);
    return seatingPosition ? seatingPosition.label : 'Unknown';
  }

  // Get severity name
  getSeverityLabel(severityValue: any): any {
    const severity = this.crashSeverityOptions.find(s => s.value === severityValue);
    return severity ? severity.label : 'Unknown';
  }
}
