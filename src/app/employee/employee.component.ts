import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiemployeeService } from '../apiemployee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface userData {
  empId: number,
  empName: string,
  empEmail: string,
  empAddress: string,
  empPhone: string
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private _ApiEmploy: ApiemployeeService) { }

  displayedColumns: string[] = ["empName", "empEmail", "empAddress", "empPhone", "action"]
  dataSource !: MatTableDataSource<userData>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  AddForm: FormGroup = new FormGroup({
    empId: new FormControl(null),
    empName: new FormControl(null, [Validators.required]),
    empEmail: new FormControl(null, [Validators.required, Validators.email]),
    empAddress: new FormControl(null, [Validators.required]),
    empPhone: new FormControl(null, [Validators.required, Validators.pattern(`^(010|012|015|011)[0-9]{8}$`)])
  })

  error: string = '';
  DisplayEmp: any[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  employeeId: number = 0
  hiddenElement!: boolean;
  showOverlay:boolean = true;

  clickAddemp() {
    this.AddForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  checkLength() {
    if (this.DisplayEmp.length > 0) {
      this.hiddenElement = true;
    }
    else {
      this.hiddenElement = false;
    }
  }

  addEmployeeForm() {
    this._ApiEmploy.AddEmployee(this.AddForm.value).subscribe(
      res => {
        console.log(res)
        let close = document.getElementById("close")
        this.AddForm.reset()
        this.GetAllEmployees()
        close?.click()
      })
  }

  GetAllEmployees() {
    this._ApiEmploy.DisplayAllEmployees().subscribe(
      res => {
        if (res) {
          this.showOverlay = false;
        }
        this.DisplayEmp = res;
        console.log(this.AddForm)
        this.dataSource = new MatTableDataSource(this.DisplayEmp)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
  }

  EmpId(employee: any) {
    this._ApiEmploy.getEmpId(employee.empId).subscribe(
      res => {
        console.log(employee.empId)
        this.employeeId = employee.empId
      }
    )
  }

  DeleteEmp() {
    this._ApiEmploy.DeleteeEmployeeApi(this.employeeId).subscribe(
      res => {
        let cancel = document.getElementById("cancel");
        cancel?.click()
        this.GetAllEmployees()
      }
    )
  }

  EditEmp(employee: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.AddForm.controls['empId'].setValue(employee.empId)
    this.AddForm.controls['empName'].setValue(employee.empName)
    this.AddForm.controls['empEmail'].setValue(employee.empEmail)
    this.AddForm.controls['empAddress'].setValue(employee.empAddress)
    this.AddForm.controls['empPhone'].setValue(employee.empPhone)

  }
  updateEmp() {
    this._ApiEmploy.EditEmployeApi(this.AddForm.value).subscribe(
      res => {
        let close = document.getElementById("close")
        this.AddForm.reset()
        this.GetAllEmployees()
        close?.click()
      }
    )
  }

  ngOnInit(): void {
    this.GetAllEmployees()
  }
}


