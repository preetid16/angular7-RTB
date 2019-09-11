import { AdminRoutingModule } from  './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';

@NgModule({
// [...]
imports: [
    AdminRoutingModule
],
declarations: [ManageEmployeeComponent]
})
export  class  AdminModule { }