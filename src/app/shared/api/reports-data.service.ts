import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsDataService {

  constructor(private httpClient: HttpClient) { }

  //get All Reports Details by pagination
  public getReportsByPagination(data): Observable<any> {
    return this.httpClient.post('crash_reports/getAllCrashReports', data).pipe(
      tap((res) => {
        return res;
      }),
      catchError((error) => throwError(() => error))
    );
  }




}
