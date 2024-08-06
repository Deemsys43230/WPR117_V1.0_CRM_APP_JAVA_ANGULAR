import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class RoleDataService {

    constructor(private httpClient: HttpClient) { }

    //getAllRoles
    public getAllRoles(): Observable<any> {
        return this.httpClient.get('role/getAllRoles').pipe(
            tap(res => { return res}), 
            catchError(error => {
                console.error('Error:', error);
                return throwError(() => error);
            })
        );
    }
}
