import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { ManagementComponent } from './management/management.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { DeleteMenuComponent } from './delete-menu/delete-menu.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { AdminMenuComponent } from './pages/admin-menu/admin-menu.component';
import { AdminClientsComponent } from './pages/admin-clients/admin-clients.component';
import { AdminSalesComponent } from './pages/admin-sales/admin-sales.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [
    ManagementComponent,
    MenuListComponent,
    AddMenuComponent,
    EditMenuComponent,
    DeleteMenuComponent,
    SpinnerComponent,
    AdminMenuComponent,
    AdminClientsComponent,
    AdminSalesComponent,
    ClientManagementComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ManagementComponent,
    SpinnerComponent
  ]
})
export class AdminModule { }
