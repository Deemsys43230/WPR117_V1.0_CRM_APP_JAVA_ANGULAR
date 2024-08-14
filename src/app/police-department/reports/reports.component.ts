import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceDepartmentDataService } from 'src/app/shared/api/police-department-data.service';
import { OccupantsService } from 'src/app/shared/services/occupants-service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  policeImageUrl: string = '';
  police_name: any;
  public error: boolean = false;
  public reportsData: any = [];
  public pagebutton: boolean = false;
  public searchPage: number;
  public totalPages: number = 0;
  public isPageAvailable: boolean;
  public currentPage: any = 1;
  public searchData: any;
  public pageValue: number = 5;
  public policeDepartmentForm: any;
  public occupantDetail: any = [];
  public count: number;
  public startIndex: number;
  public endIndex: number;
  public pages: any[] = [];
  public ItemsPerPage: any = [];
  public countyList: any[] = [];
  currentTab: string = 'uploadReports'; // Default active tab
  public report_id: any;

  constructor(private fb: FormBuilder, private policeDepartmentService: PoliceDepartmentDataService, private router: Router, private activatedRoute: ActivatedRoute, private occupantsService: OccupantsService) { }

  //ngOnInit
  ngOnInit(): void {
    this.initializationSearchOccupantsForm();
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.pageValue,
      addedOnFromDate: (this.policeDepartmentForm.value.addedOnFromDate != undefined) ? this.policeDepartmentForm.value.addedOnFromDate : "",
      addedOnToDate: (this.policeDepartmentForm.value.addedOnToDate != undefined) ? this.policeDepartmentForm.value.addedOnToDate : "",
      countyId: (this.policeDepartmentForm.value.countyId != undefined) ? this.policeDepartmentForm.value.countyId : "",
      crashDate: (this.policeDepartmentForm.value.crashDate != undefined) ? this.policeDepartmentForm.value.crashDate : "",
      firstName: (this.policeDepartmentForm.value.firstName != undefined) ? this.policeDepartmentForm.value.firstName : "",
      lastName: (this.policeDepartmentForm.value.lastName != undefined) ? this.policeDepartmentForm.value.lastName : "",
      policeDepartmentId: (this.policeDepartmentForm.value.policeDepartmentId != undefined) ? this.policeDepartmentForm.value.policeDepartmentId : "",
      location: (this.policeDepartmentForm.value.location != undefined) ? this.policeDepartmentForm.value.location : "",
      reportNumber: (this.policeDepartmentForm.value.reportNumber != undefined) ? this.policeDepartmentForm.value.reportNumber : "",
      reportType: 1,
      searchType: 1,
      accountId: "0",
    };
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
      if (this.police_name) {
        this.getByNamePoliceDepartment();
      }
    });
    this.getAllOccupants();
  }

  // Initialization Search Occupants Form
  initializationSearchOccupantsForm() {
    this.policeDepartmentForm = this.fb.group({
      addedOnFromDate: "",
      addedOnToDate: "",
      countyId: "",
      crashDate: "",
      firstName: "",
      lastName: "",
      policeDepartmentId: "",
      location: "",
      reportNumber: "",
      reportType: 1,
      searchType: 1
    })
  }

  //get by name
  getByNamePoliceDepartment() {
    this.policeDepartmentService?.getByNamePoliceDepartmentDetails(this.police_name).subscribe(res => {
      if (res.status) {
        this.policeImageUrl = res.data.url;
      }
    })
  }

  // Search Function  For  Account
  onSearch() {
    this.currentPage = 1
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.pageValue,
      addedOnFromDate: (this.policeDepartmentForm?.value.addedOnFromDate) ? this.policeDepartmentForm.value.addedOnFromDate : "",
      addedOnToDate: (this.policeDepartmentForm?.value.addedOnToDate) ? this.policeDepartmentForm.value.addedOnToDate : "",
      countyId: (this.policeDepartmentForm?.value.countyId) ? this.policeDepartmentForm.value.countyId : "",
      crashDate: (this.policeDepartmentForm?.value.crashDate) ? this.policeDepartmentForm.value.crashDate : "",
      firstName: (this.policeDepartmentForm?.value.firstName) ? this.policeDepartmentForm.value.firstName : "",
      lastName: (this.policeDepartmentForm?.value.lastName) ? this.policeDepartmentForm.value.lastName : "",
      policeDepartmentId: (this.policeDepartmentForm?.value.policeDepartmentId) ? this.policeDepartmentForm.value.policeDepartmentId : "",
      location: (this.policeDepartmentForm?.value.location) ? this.policeDepartmentForm.value.location : "",
      reportNumber: (this.policeDepartmentForm?.value.reportNumber) ? this.policeDepartmentForm.value.reportNumber : "",
      reportType: 1,
      searchType: 1,
      accountId: "0",
    };
    this.occupantDetail.length <= this.pageValue ? this.pageValue = 5 : '';
    this.getAllOccupants();
  }

  // Reset  Search
  resetSearch() {
    this.currentPage = 1;
    this.policeDepartmentForm.reset();
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.pageValue,
      addedOnFromDate: (this.policeDepartmentForm?.value.addedOnFromDate) ? this.policeDepartmentForm.value.addedOnFromDate : "",
      addedOnToDate: (this.policeDepartmentForm?.value.addedOnToDate) ? this.policeDepartmentForm.value.addedOnToDate : "",
      countyId: (this.policeDepartmentForm?.value.countyId) ? this.policeDepartmentForm.value.countyId : "",
      crashDate: (this.policeDepartmentForm?.value.crashDate) ? this.policeDepartmentForm.value.crashDate : "",
      firstName: (this.policeDepartmentForm?.value.firstName) ? this.policeDepartmentForm.value.firstName : "",
      lastName: (this.policeDepartmentForm?.value.lastName) ? this.policeDepartmentForm.value.lastName : "",
      policeDepartmentId: (this.policeDepartmentForm?.value.policeDepartmentId) ? this.policeDepartmentForm.value.policeDepartmentId : "",
      location: (this.policeDepartmentForm?.value.location) ? this.policeDepartmentForm.value.location : "",
      reportNumber: (this.policeDepartmentForm?.value.reportNumber) ? this.policeDepartmentForm.value.reportNumber : "",
      reportType: 1,
      searchType: 1,
      accountId: "0",
    };
    this.getAllOccupants();
    this.occupantDetail.length <= this.pageValue ? this.pageValue = 5 : '';
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

  //Get All Occupants 
  getAllOccupants() {
    this.searchData = {
      page: this.currentPage,
      itemsPerPage: this.pageValue,
      addedOnFromDate: (this.policeDepartmentForm?.value.addedOnFromDate) ? this.policeDepartmentForm.value.addedOnFromDate : "",
      addedOnToDate: (this.policeDepartmentForm?.value.addedOnToDate) ? this.policeDepartmentForm.value.addedOnToDate : "",
      countyId: (this.policeDepartmentForm?.value.countyId) ? this.policeDepartmentForm.value.countyId : "",
      crashDate: (this.policeDepartmentForm?.value.crashDate) ? this.policeDepartmentForm.value.crashDate : "",
      firstName: (this.policeDepartmentForm?.value.firstName) ? this.policeDepartmentForm.value.firstName : "",
      lastName: (this.policeDepartmentForm?.value.lastName) ? this.policeDepartmentForm.value.lastName : "",
      policeDepartmentId: (this.policeDepartmentForm?.value.policeDepartmentId) ? this.policeDepartmentForm.value.policeDepartmentId : "",
      location: (this.policeDepartmentForm?.value.location) ? this.policeDepartmentForm.value.location : "",
      reportNumber: (this.policeDepartmentForm?.value.reportNumber) ? this.policeDepartmentForm.value.reportNumber : "",
      reportType: 1,
      searchType: 1,
      accountId: "0",
    };
    this.occupantsService?.getAllOccupants(this.searchData).subscribe(res => {
      if (res.status) {
        this.occupantDetail = res.data
        this.count = res.total;
        this.calculateTotalPages();
        this.setPaginatedData();
        this.togglePagination();
        this.pagesArray(this.currentPage, this.count, this.pageValue, 5)
        this.reportsData = [];
        this.occupantDetail.forEach(data => {
          this.reportsData.push({
            crashDate: this.convertGMTDateToMMDDYYYY(data.crash_date),
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

  // Calculate total pages for pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.count / this.pageValue);
  }

  // Set  Data For Item Per Page In Table
  setPaginatedData() {
    this.startIndex = (this.currentPage - 1) * this.pageValue;
    this.endIndex = Math.min(this.startIndex + this.pageValue, this.count);
    this.occupantDetail.forEach(data => {
      this.reportsData.push({
        crashDate: this.convertGMTDateToMMDDYYYY(data.crash_date),
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

  // To Change The Item Per Page Number For  Pagination
  onChangePagination(event) {
    this.pageValue = parseInt(event.target.value)
    this.currentPage = 1;
    this.searchData["itemsPerPage"] = this.pageValue
    this.getAllOccupants();
    if (this.pageValue > this.count) {
      this.pagebutton = true
      this.searchPage = null;
      this.isPageAvailable = false;
    } else {
      this.pagebutton = false;
    }
  }

  // Search  Page Number  function For Pagination 
  goToPage(page: number) {
    this.currentPage = page;
    this.searchData["page"] = this.currentPage
    this.getAllOccupants();
    this.calculateTotalPages();
    this.searchPage = null;
    this.setPaginatedData();
  }

  //  Route For  Next  Page   Number Function
  nextPage() {
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
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedData();
      this.searchPage = null;
      this.searchData["page"] = this.currentPage
      this.getAllOccupants();
    }
  }

  private setupSearchData(reportType: number) {
    return {
      page: this.currentPage,
      itemsPerPage: this.pageValue,
      addedOnFromDate: this.policeDepartmentForm.value.addedOnFromDate || "",
      addedOnToDate: this.policeDepartmentForm.value.addedOnToDate || "",
      countyId: this.policeDepartmentForm.value.countyId || "",
      crashDate: this.policeDepartmentForm.value.crashDate || "",
      firstName: this.policeDepartmentForm.value.firstName || "",
      lastName: this.policeDepartmentForm.value.lastName || "",
      policeDepartmentId: this.policeDepartmentForm.value.policeDepartmentId || "",
      location: this.policeDepartmentForm.value.location || "",
      reportNumber: this.policeDepartmentForm.value.reportNumber || "",
      reportType: reportType,
      searchType: 1,
      accountId: "0",
    };
  }

  private processApiResponse(res: any) {
    if (res.status) {
      this.occupantDetail = res.data;
      this.count = res.total;
      this.calculateTotalPages();
      this.setPaginatedData();
      this.togglePagination();
      this.pagesArray(this.currentPage, this.count, this.pageValue, 5);
      this.reportsData = this.occupantDetail.map(data => ({
        crashDate: this.convertGMTDateToMMDDYYYY(data.crash_date),
        report_number: data.report_number,
        location: data.location,
        no_of_occupants: data.no_of_occupants,
        file_name: data.file_name,
        occupantsForms: data.occupantsForms,
        police_department: data.police_department
      }));
      this.error = this.occupantDetail.length === 0;
    }
  }

  // Function to change tabs
  setActiveTab(tab: string) {
    this.currentTab = tab;
    let reportType = tab === 'uploadReports' ? 1 : 2;
    this.searchData = this.setupSearchData(reportType);
    this.occupantsService?.getAllOccupants(this.searchData).subscribe(res => {
      this.processApiResponse(res);
    });
  }

  // Navigate to new report
  addNewReport() {
    this.router.navigate(['reports/', this.police_name, 'add-new-report'])
  }

  // Handle delete
  delete(report_id: string) {
    this.occupantsService.deleteCrashReport(report_id).subscribe(res => {
      alert(res.message)
      this.getAllOccupants();
    })
  }

  // Handle edit
  edit(report_id: string) {
      this.router.navigate(['reports/',this.police_name,report_id])
  }
}
