import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUserModel } from '../model/user-model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { AuthorizedGuardService } from '../guard/authorized-guard.guard';

const apiUrl = "http://localhost:8070/api/v1/rest/";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  

  constructor(private http: HttpClient, private tokenservice : TokenServiceService, private authorizedGuard: AuthorizedGuardService) { }

  login(userLogin: UserUserModel): Observable<{message: string, result: string}> {
    return this.http.post<any>(apiUrl+"auth/login", userLogin).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred';
        if (error && error.error && error.error.errors && error.error.errors.length > 0) {
          errorMessage = error.error.errors[0].message;
        }
        return throwError(errorMessage);
      }),
      tap(response => {
        if (response) {
          if (response) {
            this.tokenservice.saveToken(response.result);
          }
        }
      })
    );
  }

  register(userRegister: UserUserModel): Observable<{message: string, result: string}> {
    return this.http.post<any>(apiUrl+"auth/new/user", userRegister).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred';
        if (error && error.error && error.error.errors && error.error.errors.length > 0) {
          errorMessage = error.error.errors[0].message;
        }
        return throwError(errorMessage);
      }),
      tap(response => {
        if (response) {
          this.tokenservice.saveToken(response.result);
        }
      })
    );
  }

  getUserByEmail(): Observable<{message: String, result: UserUserModel}> {
    const email = this.authorizedGuard.getEmailFromToken();
    return this.http.get<{message: String, result: UserUserModel}>(`${apiUrl}user/${email}`);
  }

  logout(): Boolean {
    this.tokenservice.removeToken();
    return true;
  }

  getUserById(): Observable<{message: String, result: UserUserModel}> {
    const id = this.authorizedGuard.getIdFromToken();
    return this.http.get<{message: String, result: UserUserModel}>(`${apiUrl}user/`+id);
  }

  updateUser(user: UserUserModel, id: string): Observable<{message: string, result: UserUserModel, errors: string, errorMap: string[]}> {
    return this.http.put<{message: string, result: UserUserModel, errors: string, errorMap: string[]}>(`${apiUrl}update/user/`+id, user);
  }
}
