import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../userData.service';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import swal from 'sweetalert';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private UserService: UserService,
              private auth: AuthService) { }

  username: string = '';
  password: string = '';
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      formAdminOrEmp: new FormControl('false', [Validators.required]),
      formUsername: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      formPassword: new FormControl('', [Validators.required]),
    });
  }
  
  onLogin(event, values): void {
    const self = this;
    this.UserService.getUsers().subscribe(response => {
      console.log(response);
      const user = response.filter(user => {
        return (user.name === values.formUsername && user.password === values.formPassword && user.is_admin == values.formAdminOrEmp);
      });
      console.log(user);
      if (user !== undefined && user.length !== 0) {
        self.auth.login(values.formUsername, values.formPassword)
          .pipe(first())
          .subscribe(
          result => self.router.navigate(['/signup'])
        );
      } else {
       swal("Oops!", "Invaild Username and Password", "error");
      }
    })
  }
}
