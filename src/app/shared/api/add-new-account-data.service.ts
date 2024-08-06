import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AddNewAccountDataService {

    constructor(private httpClient: HttpClient) { }

    //Add new account
    public addNewAccountData(data): Observable<any> {
        return this.httpClient.post('createAccount',data).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }

    //Get by id account
    public getByIdAccountData(id): Observable<any> {
        return this.httpClient.get(`getAccountsById/${id}`).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }

     //Update account
     public updateAccountData(id, data): Observable<any> {
        return this.httpClient.put(`updateAccount/${id}`,data).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(() => error)));
    }
}
