import { Component } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, ReactiveFormsModule,EmployeeFormComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: Employee[] = [];
  selectedEmployee: Employee ={ id: 0, firstName: '', lastName: '', mobile: '', address: '' };
  showForm = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }


  addEmployee() {
    this.selectedEmployee = { id: 0, firstName: '', lastName: '', mobile: '', address: '' };
    this.showForm = true;
  }

  editEmployee(emp: Employee) {
    this.selectedEmployee = emp;
    this.showForm = true;
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  onSave(emp: any) {
    if (this.selectedEmployee?.id) {
      emp.id = this.selectedEmployee.id;
      this.employeeService.updateEmployee(emp).subscribe(() => this.loadEmployees());
    } else {
      this.employeeService.addEmployee(emp).subscribe(() => this.loadEmployees());
    }
    this.showForm = false;
  }

  onCancel() {
    this.showForm = false;
  }

}
