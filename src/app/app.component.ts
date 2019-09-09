import { Component } from '@angular/core';
import { AngularMaterialModule } from './shared/angular-material.module';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class AppComponent {
  logoutFlag: boolean = false;
  constructor(private auth: AuthService, private router: Router) {
   }
   logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
