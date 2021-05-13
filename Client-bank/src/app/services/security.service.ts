import { Injectable } from '@angular/core';

import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Global } from './../config/global'
import { User } from './../model/user'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private urlService = Global.url + 'token';

  constructor(private http: HttpClient) { }

  public getToken(user: User): Observable<any> {
    return this.http.post<any>(this.urlService, JSON.stringify(user), httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        if (res.headers.has("Authorization")) {
          user.token = res.headers.get("Authorization");
          localStorage.setItem('token', 'Bearer ' + res.headers.get("Authorization"));
        }
        return user;
      }),
      catchError(this.handleError))
  }

  private handleError(error: any) {
    console.log("securityService error", error);
    return throwError("lanzando error: " + error);
  }
}
