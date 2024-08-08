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

  //Save Police Deaprtment details
  public savePoliceDepartment(data) {
    return this.policeDepartmentDataService.savePoliceDepartment(data)
  }

  //Save or Update Police Department by id
  public savePoliceDepartmentImage(data: any) {
    return this.policeDepartmentDataService.savePoliceDepartmentImage(data)
  }

  //Update Police Department details by id
  public updatePoliceDepartment(data: any, id: number) {
    return this.policeDepartmentDataService.updatePoliceDepartment(data, id)
  }

  //Enable and Disable Police department by id
  public enableDisablePoliceDepartment(data: any, id: number) {
    return this.policeDepartmentDataService.enableDisablePoliceDepartment(data, id)
  }
}
