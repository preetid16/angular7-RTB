import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from "./signup-form/signup-form.component";
import { LoginComponent } from "./login/login.component";
//import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AuthGuard } from './auth-guard';
const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent ,
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent , pathMatch: 'full'},
  { path: 'signup', component: SignupFormComponent,  pathMatch: 'full' },
];


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,  {enableTracing: false, useHash : true })
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
