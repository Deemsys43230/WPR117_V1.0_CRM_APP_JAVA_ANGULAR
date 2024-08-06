import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoliceDepartmentDataService {

  constructor(private httpClient: HttpClient) { }

   //get all police department details by pagination
   public getPoliceDepartmentDetailsByPagination(data): Observable<any> {
    return this.httpClient.post('getAllSearchPoliceDepartment', data).pipe(tap(res => {
        return res;
    }), catchError(error => throwError(() => error)));
}

   //get by id police department details
   public getByIdPoliceDepartmentDetails(id: number): Observable<any> {
    return this.httpClient.get(`getByIdPoliceDepartment/${id}`).pipe(tap(res => {
        return res;
    }), catchError(error => throwError(() => error)));
}

}
