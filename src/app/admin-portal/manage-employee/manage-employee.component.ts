import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from './../../userData.service';
import { Employee } from "./../../shared/interface/employee.model";
import { TitleCasePipe } from "./../../shared/pipe/titleCase.pipe";
import { FormControl, FormGroup, Validators } from '@angular/forms';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})

export class ManageEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'empId', 'email', 'location', 'department', 'actionColumn'];
  public addForm: FormGroup;
  users: Employee[];
  showAddForm: boolean = false;
  showTable: boolean = true;

  animal: string;
  name: string;

  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(data => {
        this.users = data;
      });

  }
  deleteEmployee(employee: Employee, event: Event) {
    let deleteBy = (employee.empId) ? employee.empId : employee.id;
    this.service.deleteUser(deleteBy)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== employee);
      });
  };

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  public addForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: UserService, ) { }
  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      empId: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [])
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewUser(addFormObj) {
    console.log(addFormObj);
    if (addFormObj.password == '') {
      addFormObj.password = addFormObj.username;
    }
    this.service.createUser(this.addForm.value)
      .subscribe(data => {
        swal('success', "Employee Details added Successfully.", "success");
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  }

}