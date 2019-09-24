import { AdminRoutingModule } from  './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEmployeeComponent, DialogOverviewExampleDialog } from './manage-employee/manage-employee.component';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';
import { AngularMaterialModule } from './../shared/angular-material.module';
import { ItemOfDayComponent } from './item-of-day/item-of-day.component';
import { ItemMasterListComponent, MaterListAddItemDialog } from './item-master-list/item-master-list.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
imports: [
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CommonModule
],
declarations: [ManageEmployeeComponent, TransactionManagementComponent, ItemOfDayComponent, ItemMasterListComponent, DialogOverviewExampleDialog, MaterListAddItemDialog],
entryComponents: [DialogOverviewExampleDialog, MaterListAddItemDialog],
})
export  class  AdminModule { }