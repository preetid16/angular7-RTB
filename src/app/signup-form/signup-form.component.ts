import { Component, OnInit } from '@angular/core';
import { Employee } from "./../shared/interface/employee.model";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { Router } from "@angular/router";
import { UserService } from './../userData.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  public empForm: FormGroup;
  constructor(private router: Router, private apiService: UserService) { }

  ngOnInit() {
    this.empForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      empId: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      is_admin: new FormControl('', [])
     }, this.pwdMatchValidator);
  }
  
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirmPassword').value
       ? null : {'mismatch': true};
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.empForm.controls[controlName].hasError(errorName);
  }

  public createUser = (e, empFormValue) => {

    if (this.empForm.valid) {
      console.log(e);
      this.apiService.createUser(this.empForm.value)
        .subscribe(data => {
          swal("Success", "User Registered successfully!!", "success");
          this.router.navigate(['login']);
        });
      e.preventDefault();
      e.stopPropagation();
    } else {
      swal("Oops!", "Please fill all the required details!", "error");
    }
  }


}
