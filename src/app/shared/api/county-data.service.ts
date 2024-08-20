import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CountyDataService {

    constructor(private httpClient: HttpClient) { }

    //getAllCounty
    public getAllCounty(data): Observable<any> {
        return this.httpClient.post('county/getAllCounty',data).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }

    //Get All Count for Dashboard
    public getDashboardCount(): Observable<any> {
        return this.httpClient.get('user/getAllCount').pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }
}
