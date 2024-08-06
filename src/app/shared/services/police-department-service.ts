import { Injectable } from '@angular/core';
import { PoliceDepartmentDataService } from '../api/police-department-data.service';
@Injectable({
    providedIn: 'root'
})

export class PoliceDepartmentService {
    constructor(private policeDepartmentDataService: PoliceDepartmentDataService) { }

     //get all police department
     public getPoliceDepartmentDetailsByPagination(data) {
        return this.policeDepartmentDataService.getPoliceDepartmentDetailsByPagination(data);
    }

  //get by id police department
  public getByIdPoliceDepartmentDetails(id) {
    return this.policeDepartmentDataService.getByIdPoliceDepartmentDetails(id);
}
}