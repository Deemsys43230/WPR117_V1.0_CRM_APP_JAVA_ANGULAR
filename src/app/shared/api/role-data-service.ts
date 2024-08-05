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
            tap(res => console.log('Response:', res)), // Log response for debugging
            catchError(error => {
                console.error('Error:', error); // Log error for debugging
                return throwError(() => error);
            })
        );
    }
}
