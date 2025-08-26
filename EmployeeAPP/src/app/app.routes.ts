import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';

export const routes: Routes = [
      { path: '', component: EmployeeListComponent },
  { path: 'create', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeFormComponent }
];
