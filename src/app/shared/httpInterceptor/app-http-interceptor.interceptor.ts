import { switchMap, catchError, retry } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { AuthDataService } from '../api/auth-data-service';
import { AuthService } from '../services/auth-service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router,private authService: AuthService ) { }
   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let domain = environment.domainName;
        const request = req.clone({
            headers: req.headers.set(
                'Authorization', "Bearer " + localStorage.getItem("Authorization-Token")
            ),
            url: domain + req.url
        });
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // if (err.statusText == "Unauthorized") {
                    return this.authService.refreshToken(localStorage.getItem('Refresh-Token')).pipe(
                        switchMap((authResponse) => {
                            localStorage.setItem("Authorization-Token", authResponse.accessToken)
                            const refreshRequest = req.clone({
                                headers: req.headers.set(
                                    'Authorization', "Bearer " + localStorage.getItem("Authorization-Token")
                                ),
                                url: domain + req.url
                            });
                            return next.handle(refreshRequest)
                        }), catchError(err => {
                            this.authService.logout();
                            return throwError(err);
                        })
                    );
            }
            else {
                let errorMessage;
                if (err.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${err.error.message}`
                } else {
                    errorMessage = `Error: ${err.message}`
                }
                window.alert(errorMessage);
                return throwError(err);
            }
            return throwError( err );
        }));
    }
}
