import { Injectable } from '@angular/core';

import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Global } from './../config/global'
import { Transaction } from './../model/transaction'

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private method: string = "Deposit";

  constructor(private http: HttpClient) { }

  public runTransaction(transaction: Transaction): Observable<Transaction[]> {

    if (transaction.type != 'Deposit') {
      this.method = 'withdrawal'
    }
    return this.http.post<Transaction[]>(Global.url + 'transaction/' + this.method,
      JSON.stringify(transaction),
      httpOptions).pipe(
        catchError(this.handleError('runTransaction', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
