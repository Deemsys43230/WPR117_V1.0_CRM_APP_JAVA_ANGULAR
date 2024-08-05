import { Injectable } from '@angular/core';
import { AccountsDepartmentDataService } from '../api/accounts-department-data.service';
@Injectable({
  providedIn: 'root',
})
export class AccountsDepartmentService {
  constructor(
    private accountsDepartmentDataService: AccountsDepartmentDataService
  ) {}

  //get all Member By Search
  public getAccountsDepartmentDetailsByPagination(data) {
    return this.accountsDepartmentDataService.getAccountsDepartmentDetailsByPagination(
      data
    );
  }
}
