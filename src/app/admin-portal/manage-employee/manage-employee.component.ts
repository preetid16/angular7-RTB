import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from './../../userData.service';
import { Employee } from "./../../shared/interface/employee.model";
import { TitleCasePipe } from "./../../shared/pipe/titleCase.pipe";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})

export class ManageEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'empId', 'email', 'location', 'department', 'actionColumn'];
  public addForm: FormGroup;
  users: Employee[];
  showAddForm : boolean = false;
  showTable : boolean = true;
  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(data => {
        this.users = data;
      });

    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      empId: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      is_admin: new FormControl('', [])
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  }

  deleteEmployee(employee: Employee, event: Event) {
    let deleteBy = (employee.empId) ? employee.empId : employee.id;
    this.service.deleteUser(deleteBy)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== employee);
      });
  };

  openDialog (){
    this.showAddForm = true;
    this.showTable = false;
  }

}
