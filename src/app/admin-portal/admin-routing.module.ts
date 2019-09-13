import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';

import {  ManageEmployeeComponent } from "./manage-employee/manage-employee.component";
import {  AdminPortalComponent } from "./admin-portal.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminPortalComponent,
        children: [
            { path: 'employee', component: ManageEmployeeComponent },]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class  AdminRoutingModule { }