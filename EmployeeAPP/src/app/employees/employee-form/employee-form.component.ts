import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: [''],
      address: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employee'] && this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value as Employee);
      this.employeeForm.reset();
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.employeeForm.reset();
  }


}
