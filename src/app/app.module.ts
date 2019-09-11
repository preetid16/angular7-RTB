import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './login/login.component';	
import { ReactiveFormsModule } from '@angular/forms';
import { UserService  } from "./userData.service";
import { HttpClientModule} from "@angular/common/http";
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminModule } from "./admin-portal/admin-portal.module";

import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginComponent,
    AdminPortalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  exports: [],
  providers: [UserService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
