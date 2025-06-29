import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
  
export class EmployeeserviceService {
  constructor(private http: HttpClient) { }
  
  getLoginUsersList(): Observable<any>{
    return this.http.get('http://localhost:3000/users')
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/employees');
  }

  addEmp(emptData:any,options?:any): Observable<any>{
    return this.http.post<any>('http://localhost:3000/employees', emptData, {
      ...options,
      observe:'response'
    })
  }
  
  updateEmp(selectedUserObj): Observable<any>{
    console.log(selectedUserObj)
    return this.http.put(`http://localhost:3000/employees/${selectedUserObj.id}`,selectedUserObj)
  }

  deleteEmp(empId): Observable<any>{
    return this.http.delete(`http://localhost:3000/employees/${empId}`)
  }

}
