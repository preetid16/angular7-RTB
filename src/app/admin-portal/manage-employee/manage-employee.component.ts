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
  displayedColumns: string[] = ['name', 'empId','email', 'location', 'department', 'actionColumn'];

  users: Employee[];
  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(data => {
        this.users = data;
        console.log(this.users)
      });
  }

  deleteUser(i, event:Event) {
      console.log(i)
    // this.service.deleteUser(user.empId)
    //   .subscribe( data => {
    //     this.users = this.users.filter(u => u !== user);
    //   });
      
  };

}
