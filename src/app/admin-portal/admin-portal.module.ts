import { AdminRoutingModule } from  './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';
import { AngularMaterialModule } from './../shared/angular-material.module';
import { ItemOfDayComponent } from './item-of-day/item-of-day.component';
import { ItemMasterListComponent } from './item-master-list/item-master-list.component';

@NgModule({
imports: [
    AdminRoutingModule,
    AngularMaterialModule,

],
declarations: [ManageEmployeeComponent, TransactionManagementComponent, ItemOfDayComponent, ItemMasterListComponent]
})
export  class  AdminModule { }