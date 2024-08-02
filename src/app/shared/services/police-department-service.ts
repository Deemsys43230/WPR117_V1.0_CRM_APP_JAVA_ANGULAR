import { Injectable } from '@angular/core';
import { PoliceDepartmentDataService } from '../api/police-department-data.service';
@Injectable({
    providedIn: 'root'
})

export class PoliceDepartmentService {
    constructor(private policeDepartmentDataService: PoliceDepartmentDataService) { }

     //get all Member By Search
     public getPoliceDepartmentDetailsByPagination(data) {
        return this.policeDepartmentDataService.getPoliceDepartmentDetailsByPagination(data);
    }


}