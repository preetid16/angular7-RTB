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
  displayedColumns: string[] = ['name', 'empId', 'email', 'location', 'department', 'actionColumn', 'balance' , 'addMoney'];
  public addForm: FormGroup;
  users: Employee[];

  showAddForm: boolean = false;
  showTable: boolean = true;
  currentBalance: number;
  animal: string;
  name: string;
  show: boolean = false;
  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(data => {
        console.log(data);
        this.users = data;
      });

  }
  editEmployee(employee: Employee, event: Event) {
    this.show = true;
    // let deleteBy = (employee.empId) ? employee.empId : employee.id;
    // this.service.deleteUser(deleteBy)
    //   .subscribe(data => {
    //     this.users = this.users.filter(u => u !== employee);
    //   });
    
  };

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
    addMoney(row) {
    let userInfo = row;
    const self = this;
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Enter Amount you want to add",
          type: "text",
        },
      },
    }).then((value) => {
      if(value !== null) {
         value = Number(value);
      }
      if(value !== undefined && typeof value === 'number' && value !== null) {
          const userName = userInfo['userName'];
          const id = Number(userInfo['id']);
          if (id !== undefined) {
                self.service.getUserById(id).subscribe(user => {
                  user['balance'] += value;
                  user['tranaction_history'].push({
                    'userName' :userName,
                    'amount': value,
                    'type':'credit',
                    'date':new Date()
                  });
                  self.currentBalance = user['balance'];
                  self.service.updateUser(user)
                        .subscribe(data => {
                          swal("Success", "Balance Added successfully!!", "success");
                  })
              });
          }
        } else {
          swal("Error", "Something went wrong!!", "error");
        }
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
        swal('success', "Employee Details added Successfully.");
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  }


}