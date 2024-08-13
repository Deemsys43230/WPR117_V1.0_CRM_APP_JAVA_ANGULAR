import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountsDepartmentDataService {
  constructor(private httpClient: HttpClient) {}

  //get all accounts department details by pagination
  public getAccountsDepartmentDetailsByPagination(data): Observable<any> {
    return this.httpClient.post('GetAllAccounts', data).pipe(
      tap((res) => {
        return res;
      }),
      catchError((error) => throwError(() => error))
    );
  }

   //enable/disable account
   public enableDisableAccountsDepartment(id, data): Observable<any> {
    return this.httpClient.post(`enableDisableAccountById/${id}`, data).pipe(
      tap((res) => {
        return res;
      }),
      catchError((error) => throwError(() => error))
    );
  }

   //get accounts details by id
   public getByIdAccountsDetails(id): Observable<any> {
    return this.httpClient.get(`getAccountsById/${id}`).pipe(
      tap((res) => {
        return res;
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
