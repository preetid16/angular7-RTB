import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageEmployeeComponent } from "./manage-employee/manage-employee.component";
import { AdminPortalComponent } from "./admin-portal.component";
import { TransactionManagementComponent } from "./transaction-management/transaction-management.component";
import { ManageItemComponent } from "./manage-item/manage-item.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminPortalComponent,
        children: [
            { path: '', component: ManageEmployeeComponent },
            { path: 'employee', component: ManageEmployeeComponent },
            { path: 'item', component: ManageItemComponent },
            { path: 'transaction', component: TransactionManagementComponent }]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }