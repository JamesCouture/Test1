import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})


export class EmployeeDbService {
  public firestore: Firestore = inject(Firestore);

  async getData(): Promise<Employee[]> {
    const newEmployeesList: Employee[] = [];
    const q = query(collection(this.firestore, "employees"), where("name", "!=", "CA"));
    
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newEmployeesList.push(new Employee(doc.data()['name'], doc.data()['dateOfBirth'], doc.data()['city'], doc.data()['salary'], doc.data()['gender'], doc.data()['email']));
      });
      return newEmployeesList;
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }

  fetchEmployees(): Observable<Employee[]> {
    const employeesCollection = collection(this.firestore, 'employees');
    return collectionData(employeesCollection, { idField: 'id' }) as Observable<Employee[]>;
  }

  async createEmployee(employee: Employee) {
    const employees = collection(this.firestore, 'employees');
    delete employee.id;
    //@ts-ignore
    return addDoc(employees, JSON.parse(JSON.stringify(employee)));
  }
}