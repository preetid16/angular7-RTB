import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../userData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private UserService: UserService) { }

  username: string = '';
  password: string = '';
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      formAdminOrEmp: new FormControl('2', [Validators.required]),
      formUsername: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      formPassword: new FormControl('', [Validators.required]),
    });
  }
  
  onLogin(event,values): void {
    console.log(values);
    this.UserService.getUsers().subscribe(response => {
      console.log(response);
    })
  }
}
