import { Component } from '@angular/core';
import {EmployeeService} from "../service/employee.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent{
  constructor(protected employees: EmployeeService) {
  }
}
