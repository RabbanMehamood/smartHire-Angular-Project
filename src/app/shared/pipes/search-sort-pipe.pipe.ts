import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../employee/employee-table/employee';
@Pipe({
  name: 'searchSortPipe'
})
export class SearchSortPipePipe implements PipeTransform {

  transform(employeesObject: Employee[], filterText: string): any {
    if (employeesObject.length === 0 || filterText === undefined || null || "") {
      return employeesObject
    } else {
      let filteredData = employeesObject.filter(emp => {
        return Object.values(emp).some(value =>
          String(value).toLowerCase().includes(filterText.toLowerCase())
        );
      });
      return filteredData
    }
  }

}
