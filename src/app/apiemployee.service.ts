import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiemployeeService {

  constructor(private _Httpclient:HttpClient) { 
}

  AddEmployee(employee:any): Observable<any>{
   return this._Httpclient.post(`http://task.soft-zone.net/api/Employees/addEmployee`,employee)
      
  }

  DisplayAllEmployees():Observable<any>{
    return this._Httpclient.get(`http://task.soft-zone.net/api/Employees/getAllEmployees`)
  }

  DeleteeEmployeeApi(emp_id:any):Observable<any>{
    return this._Httpclient.get(`http://task.soft-zone.net/api/Employees/deleteEmpByID/${emp_id}`)
  }
  
  EditEmployeApi(employee:any):Observable<any>{
    return this._Httpclient.post(`http://task.soft-zone.net/api/Employees/editEmployee`,employee)
}

getEmpId(emp_id:number):Observable<any>{
 return this._Httpclient.get(`http://task.soft-zone.net/api/Employees/getEmpByID/${emp_id}`)
}
}