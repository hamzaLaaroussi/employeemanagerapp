import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[]=[];
  public editEmployee: Employee | null | undefined;
  public deleteEmployee: Employee | null | undefined;

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddEmpSubmit(addEmpForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addEmpForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addEmpForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addEmpForm.reset();
      }
    );
  }

  public onUpdateEmpSubmit(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmpSubmit(employeeId: number | undefined): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key:string): void {

    const searchedEmployees: Employee[] = [];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key?.toLocaleLowerCase()) !== -1
      || employee.name.toLowerCase().indexOf(key?.toLocaleLowerCase()) !== -1
      || employee.name.toLowerCase().indexOf(key?.toLocaleLowerCase()) !== -1
      ||employee.name.toLowerCase().indexOf(key?.toLocaleLowerCase()) !== -1){
        searchedEmployees.push(employee);
      }
    }

  this.employees = searchedEmployees;
  if(searchedEmployees?.length === 0 || !key){
    this.getEmployees();
  }
  }
}
