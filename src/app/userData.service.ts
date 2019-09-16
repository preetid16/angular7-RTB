import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from "./shared/interface/employee.model";
import {Observable} from "rxjs/index";

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:3000/users/';
  itemBaseUrl: string = 'http://localhost:3001/item/';
  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getItemList() : Observable<any> {
    return this.http.get(this.itemBaseUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }

  createUser(user: Employee): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }
}
