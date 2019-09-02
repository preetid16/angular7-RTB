import { Component, OnInit } from '@angular/core';
import { Employee } from "./../shared/interface/employee.model";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
public empForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.empForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      empId: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

   public hasError = (controlName: string, errorName: string) =>{
    return this.empForm.controls[controlName].hasError(errorName);
  }

  public createUser = (empFormValue) => {
    if (this.empForm.valid) {
      console.log("Valid!!")
    }
  }
  

}
