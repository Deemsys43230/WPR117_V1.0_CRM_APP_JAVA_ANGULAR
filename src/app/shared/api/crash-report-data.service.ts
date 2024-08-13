import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CrashReportDataService {

    constructor(private httpClient: HttpClient) { }

    //Save crash report
    public saveCrashReport(data): Observable<any> {
        return this.httpClient.post('crash_reports/createCrashReport',data).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }

    //Save crash report
    public updateCrashReport(data, id: any): Observable<any> {
        return this.httpClient.post(`crash_reports/updateCrashReport/${id}`,data).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }
}
