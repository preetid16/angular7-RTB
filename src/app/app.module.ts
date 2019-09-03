import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './login/login.component';	
import { ReactiveFormsModule } from '@angular/forms';
import { UserService  } from "./userData.service";
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
