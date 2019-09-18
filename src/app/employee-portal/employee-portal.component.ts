import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-employee-portal',
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.css']
})
export class EmployeePortalComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
  }
}
