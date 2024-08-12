import { Injectable } from '@angular/core';
import { ReportsDataService } from '../api/reports-data.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private reportsDataService : ReportsDataService ) { }

  //Get All Reports
  public getReportsByPagination(data:any){
    return this.reportsDataService.getReportsByPagination(data);
  }


}
