import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthDataService {

    constructor(private router: Router, private httpClient: HttpClient) { }

    // Login Data
    public login(loginData: any): Observable<any> {
        const body = new HttpParams()
            .set('username', loginData.username)
            .set('password', loginData.password)
        return this.httpClient.post('user/login/getToken', body.toString(), {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')

        }).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(error)));
    }

    // Refresh Token
    public refreshToken(refresh_token: any): Observable<any> {
        const body = new HttpParams()
            .set('refresh_token', refresh_token);
        return this.httpClient.post("login/get", body.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            }).pipe(
                map((res) => res))
    }

    // Change Password
    public changePassword(data: any): Observable<any> {
        return this.httpClient.post("user/ChangePassword", data).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(error)))
    }

    //Reset Password
    public resetPassword(data: any): Observable<any> {
        return this.httpClient.post('user/resetPassword', data).pipe(tap(res => {
            return res;
        }), catchError(error => throwError(error)))
    }
}