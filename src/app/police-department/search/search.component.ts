import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OccupantsService } from 'src/app/shared/services/occupants-service';
import { ItemsPerPage } from 'src/app/constants';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [DatePipe],
})
export class SearchComponent {
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;  // Reference to BsDatepickerDirective instance
  
  searchForm: FormGroup;
  isSubmitted = false;
  public occupantsData: any = [];
  public searchData: any;
  public currentPage: any = 1;
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
  isSearchPerformed: boolean = false;
  selectedData: any = null; 
  today: Date;
  minimumDate: Date;
  bsToDate: Date;

  constructor(private fb: FormBuilder, private occupantsService: OccupantsService, private datePipe: DatePipe) { this.ItemsPerPage = ItemsPerPage }

  //Initialization Search Occupants Form
  initializationSearchOccupantsForm() {
    this.searchForm = this.fb.group({
      crashDate: "",
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: "",
      reportNumber: "",
    })
  }

  //ngOnInit
  ngOnInit() {
    this.today = new Date();
    this.initializationSearchOccupantsForm();
  }

  //Get All Occupants 
  getAllOccupants() {
    const rawDate = this.searchForm.value.crashDate;
    let formattedDate = "";
    if (rawDate) {
      const crashDate = new Date(rawDate); // Ensure it's a Date object
      formattedDate = this.datePipe.transform(crashDate, 'MM-dd-yyyy') || ""; // Format date
    }
    this.isSearchPerformed = true;
    this.searchData = {
      firstName: this.searchForm.value.firstName ? this.searchForm.value.firstName : "",
      lastName: this.searchForm.value.lastName ? this.searchForm.value.lastName : "",
      crashDate: formattedDate ? formattedDate : "",
      location: this.searchForm.value.location ? this.searchForm.value.location : "",
      reportNumber: this.searchForm.value.reportNumber ? this.searchForm.value.reportNumber : ""
    }
    this.occupantsService.getAllSearchCrashReports(this.searchData).subscribe(res => {
      if (res.status) {
        this.occupantDetail = res.data
        this.count = res.total;
        this.calculateTotalPages();
        this.setPaginatedData();
        this.togglePagination();
        this.occupantsData = [];
        this.occupantDetail.forEach(data => {
          data.occupantsForms.forEach(occupant => {
            this.occupantsData.push({
              report_number: data.report_number,
              first_name: occupant.first_name,
              last_name: occupant.last_name,
              location: data.location,
              file_name: data.file_name,
              report_id: data.report_id
            });
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

  //Calculate total pages for pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.count / this.pageValue);
  }
  //Set  Data For Item Per Page In Table
  setPaginatedData() {
    this.startIndex = (this.currentPage - 1) * this.pageValue;
    this.endIndex = Math.min(this.startIndex + this.pageValue, this.count);
    this.occupantDetail.forEach(data => {
      this.occupantsData.push({
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

  //On search
  onSearch() {
    this.isSubmitted = true;
    if (this.searchForm.valid) {
      this.currentPage = 1
      this.searchData = {
        page: this.currentPage,
        itemsPerPage: this.pageValue,
        crashDate: this.searchForm.value.crashDate ? this.searchForm.value.crashDate : "",
        firstName: (this.searchForm.value.firstName) ? this.searchForm.value.firstName : "",
        lastName: (this.searchForm.value.lastName) ? this.searchForm.value.lastName : "",
        location: (this.searchForm.value.location) ? this.searchForm.value.location : "",
        reportNumber: (this.searchForm.value.reportNumber) ? this.searchForm.value.reportNumber : "",
      };
      this.occupantDetail.length <= this.pageValue ? this.pageValue = 5 : '';
      this.getAllOccupants();
    }
  }

   // Method to handle view report click
   openModal(data: any) {
    this.selectedData = data;  // Store the selected row's data
  }
  
  //View report
  viewReport(fileName: string, report_id: any) {
    if(fileName) {
      this.occupantsService.saveClientIP({report_id: report_id}).subscribe(res => {
        // console.log(res)
      })
      window.open(fileName, '_blank');
    } else {
      console.log('No file available');
    }
  }

  //Search Page  Number Function
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

  //To Change The Item Per Page Number For  Pagination
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

  //Search  Page Number  function For Pagination 
  goToPage(page: number) {
    this.currentPage = page;
    this.searchData["page"] = this.currentPage
    this.getAllOccupants();
    this.calculateTotalPages();
    this.searchPage = null;
    this.setPaginatedData();
  }

  //Route For  Next  Page   Number Function
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginatedData();
      this.searchPage = null;
      this.searchData["page"] = this.currentPage
      this.getAllOccupants();
    }
  }

  //Route For  Previous  Page   Number Function
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedData();
      this.searchPage = null;
      this.searchData["page"] = this.currentPage
      this.getAllOccupants();
    }
  }

    //To open date picker
    openDatePicker(obj) {
      if (obj) {
        obj.show();
      }
    }  
}
