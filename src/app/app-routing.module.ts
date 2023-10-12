import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from "./employee/employee.component";
import {EmployeesComponent} from "./employees/employees.component";

const routes: Routes = [
  {path: 'employee', component: EmployeeComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: '', redirectTo: 'employee', pathMatch: 'full'},
  {path: '**', component: EmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
