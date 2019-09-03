import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from "./shared/interface/employee.model";
import {Observable} from "rxjs/index";

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }

  createUser(user: Employee): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }
}
