import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './home/home.module';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: './home/home.module#HomeModule',
    pathMatch: 'full'
  }
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
