import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService,private http: HttpClient) {}
 
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  login(username: string, password: string, is_admin: boolean): Observable<boolean> {
    return this.http.post<{token: string}>('http://localhost:4000/api/auth', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result['token']);
          localStorage.setItem('role', is_admin ? 'admin' : 'employee');
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

}