import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OccupantsDataService {

    constructor(private httpClient: HttpClient) { }

    //get all occupants details by pagination
    public getAllOccupants(data): Observable<any> {
        return this.httpClient.post('crash_reports/getAllCrashReports', data).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }

    //delete crash report
    public deleteCrashReport(id): Observable<any> {
        return this.httpClient.get(`crash_reports/deleteCrashReport/${id}`).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }

    //get by id crash report
    public getByIdCrashReport(id): Observable<any> {
        return this.httpClient.get(`crash_reports/getCrashReportById/${id}`).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }
}
