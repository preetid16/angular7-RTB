import { Component, OnInit } from '@angular/core';

import { UserService } from './../../userData.service';
import { Employee } from "./../../shared/interface/employee.model";
import { TitleCasePipe } from "./../../shared/pipe/titleCase.pipe";

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})

export class ManageEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'location', 'department', 'actionColumn'];

  users: Employee[];
  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(data => {
        this.users = data;
        console.log(this.users)
      });
  }

  applyFilter(filterValue: string) {

  }

}
