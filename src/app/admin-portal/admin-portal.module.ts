import { AdminRoutingModule } from  './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';
import { AngularMaterialModule } from './../shared/angular-material.module';

@NgModule({
imports: [
    AdminRoutingModule,
    AngularMaterialModule,

],
declarations: [ManageEmployeeComponent, ManageItemComponent, TransactionManagementComponent]
})
export  class  AdminModule { }