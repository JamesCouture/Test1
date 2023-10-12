import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Employee } from "../model/employee";

import { EmployeeDbService } from '../firestore/employee-db.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);

  employees: Employee[] = [];
  currentEmployee: Employee | null = null;
  variable1: Employee[] = [];

  constructor(private store: EmployeeDbService) {
    this.getData();
  }

  async getData(){
    const newEmployees = this.store.getData();

    this.employees = [];

    console.log((await newEmployees).length);
    (await newEmployees).forEach((empl) => {
      this.employees$.next([...this.employees$.getValue(), empl]);
    })
  }

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  addEmployee(employee: Employee) {
    this.employees$.next([...this.employees$.getValue(), employee]);
    this.currentEmployee = employee;
    this.store.createEmployee(this.currentEmployee)
      .then(
        (docRef: { id: string | null | undefined; }) => {
          this.currentEmployee!.id = docRef.id;

        }
      )
      .catch(_ =>
        console.log('Error unable to save the employee')
      );
    return true;
  }
}