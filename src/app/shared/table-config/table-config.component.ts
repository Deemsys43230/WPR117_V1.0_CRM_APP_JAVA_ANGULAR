import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { icons } from '../../constants'
import { ItemsPerPage } from '../../constants'

@Component({
  selector: 'table-config',
  templateUrl: './table-config.component.html',
  styleUrls: ['./table-config.component.scss']
})

export class TableConfigComponent implements OnInit {
  @ViewChild('searchPageNumber') searchPageNumberInput!: ElementRef<HTMLInputElement>;

  @Input() tableData: any;
  @Input() search: any;

  @Output() actionOutput = new EventEmitter<any>();
  @Output() page = new EventEmitter<any>();
  pageSize = 5;
  public items = ItemsPerPage;
  public selectedIcons: any[] = [];
  public count: any[] = [];
  public currentPage: any = 1;
  public pagination: any[] = [];
  public paginationDesign: boolean | undefined;
  public pageItem: any = 5;
  public endItem: Number | undefined;
  public startItem: Number | undefined;
  public totalItem: Number | undefined;
  public isSearchValidation: boolean = false;
  public isValid: boolean = false;

  ngOnInit(): void {
    icons.forEach(val => {
      this.tableData?.actionButton.forEach((ele: any) => {
        if (val.title == ele) {
          this.selectedIcons.push(val);
        }
      })
    })
    var length = Math.ceil(this.tableData?.totalCount / this.pageItem);
    this.count = Array.from({ length }, (_, i) => i + 1);
    this.paginationFunction(this.count);
    this.itemCalculation();
  }

  // Initial Function to call from another component
  initialFunction(count: any) {
    this.currentPage = (this.search) ? this.search.currentPage : this.currentPage;
    this.pageItem = (this.search) ? this.search.itemsPerPage : this.pageItem;
    this.pageSize = this.pageItem;
    var length = Math.ceil(count / this.pageItem);

    this.count = Array.from({ length }, (_, i) => i + 1);
    this.itemCalculation();
    this.paginationFunction(this.count);
  }

  // Function Calls when change Items per page 
  onChangeItem(event: any) {
    this.pageItem = event.target.value;
    var setCurrentPage = Math.ceil(this.tableData.totalCount / this.pageItem);
    // Reset error messages
    this.isValid = false;
    this.isSearchValidation = false;
    // Clear the search field
    const searchPageInput: HTMLInputElement | null = document.querySelector('.searchPage');
    if (searchPageInput) {
      searchPageInput.value = '';
    }
    if (this.currentPage > setCurrentPage) {
      this.currentPage = setCurrentPage;
    } else {
      this.currentPage = this.currentPage;
    }
    this.page.emit({ page: this.currentPage, item: this.pageItem });
    this.search = null;
  }

  // To Calculate Items page calculation
  itemCalculation() {
    this.endItem = Number(this.currentPage) * Number(this.pageItem)
    this.startItem = (Number(this.endItem) - Number(this.pageItem)) + 1
  }

  // Searching Page
  pageSearch(value: any) {
    var pageNumber = Number(value);
    if (pageNumber > 0 && pageNumber <= this.count.length) {
      this.currentPage = pageNumber;
      this.page.emit({ page: pageNumber, item: this.pageItem });
      this.isSearchValidation = false;
      this.isValid = false;
      this.searchPageNumberInput.nativeElement.value = ''
    } else if (pageNumber < 1 || this.count.length <= pageNumber) {
      this.isValid = true
    } else {
      this.isSearchValidation = true;
    }
    this.search = null;
  }

  // This Function to emit clicking action and data
  action(row: any, title: any) {
    this.actionOutput.emit({ data: row, action: title });
  }

  // Next Page
  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.page.emit({ page: this.currentPage, item: this.pageItem });
    this.search = null;
    this.searchPageNumberInput.nativeElement.value = ''
    this.isSearchValidation = false;
    this.isValid = false;
  }

  // Previous Page
  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.page.emit({ page: this.currentPage, item: this.pageItem });
    this.search = null;
    this.searchPageNumberInput.nativeElement.value = ''
    this.isSearchValidation = false;
    this.isValid = false;
  }

  // Selected Page
  selectedPage(pageNum: any) {
    this.currentPage = pageNum;
    this.page.emit({ page: this.currentPage, item: this.pageItem });
    this.search = null;
    this.searchPageNumberInput.nativeElement.value = ''
    this.isSearchValidation = false;
    this.isValid = false;
  }

  // Pagination Calculation
  paginationFunction(count: any[]) {
    this.pagination = []
    var dots = '...'
    if (count.length <= 5) {
      this.pagination = count
    } else if (this.currentPage == 1 || this.currentPage == count.length) {
      this.pagination.push(1, 2, dots, count.length - 1, count.length)
    }
    else if (this.currentPage == 2) {
      this.pagination.push(1, 2, dots, count.length)
    }
    else if (count.length - 1 == this.currentPage) {
      this.pagination.push(1, dots, count.length - 2, count.length - 1, count.length)
    }
    else {
      this.pagination.push(1, dots, this.currentPage, dots, count.length)
    }
  }
}