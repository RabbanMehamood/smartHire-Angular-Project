import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import JSONDigger from 'json-digger';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-organisation-chart',
  templateUrl: './organisation-chart.component.html',
  styleUrl: './organisation-chart.component.scss',
})
export class OrganisationChartComponent {
  //data with check boxes:
  selectedCategories: any[] = [];

  categories: any[] = [
    { name: 'Accounting' },
    { name: 'Marketing' },
    { name: 'Production' },
    { name: 'Research' },
    { name: 'Human Resources' },
    { name: 'Information Technology' },
    { name: 'Customer Service' },
    { name: 'Legal' },
    { name: 'Sales' },
    { name: 'Finance' },
    { name: 'Quality Assurance' },
    { name: 'Logistics' },
    { name: 'Procurement' },
    { name: 'Public Relations' },
    { name: 'Product Development' },
    { name: 'Operations' },
    { name: 'Training and Development' },
    { name: 'Compliance' },
    { name: 'Security' },
    { name: 'Data Analytics' },
    { name: 'Creative Services' },
    { name: 'Technical Support' },
    { name: 'Business Intelligence' },
    { name: 'Maintenance' },
    { name: 'Environmental Health and Safety' },
  ];

  //data for chart:
  ds = {
    id: '1',
    name: 'Lao Lao',
    title: 'general manager',
    children: [
      { id: '2', name: 'Bo Miao', title: 'department manager' },
      {
        id: '3',
        name: 'Su Miao',
        title: 'department manager',
        children: [
          { id: '4', name: 'Tie Hua', title: 'senior engineer' },
          {
            id: '5',
            name: 'Hei Hei',
            title: 'senior engineer',
            children: [
              { id: '6', name: 'Dan Zai', title: 'engineer' },
              { id: '7', name: 'Dan Dan', title: 'engineer' },
              { id: '8', name: 'Xiang Xiang', title: 'engineer' },
              { id: '9', name: 'Ke Xin', title: 'engineer' },
              { id: '10', name: 'Xiao Dan', title: 'engineer' },
              { id: '11', name: 'Dan Dan Zai', title: 'engineer' },
            ],
          },
          { id: '12', name: 'Pang Pang', title: 'senior engineer' },
          { id: '13', name: 'Er Pang', title: 'senior engineer' },
          { id: '14', name: 'San Pang', title: 'senior engineer' },
          { id: '15', name: 'Si Pang', title: 'senior engineer' },
        ],
      },
      { id: '16', name: 'Hong Miao', title: 'department manager' },
      { id: '17', name: 'Chun Miao', title: 'department manager' },
      { id: '18', name: 'Yu Li', title: 'department manager' },
      { id: '19', name: 'Yu Jie', title: 'department manager' },
      { id: '20', name: 'Yu Wei', title: 'department manager' },
      { id: '21', name: 'Yu Tie', title: 'department manager' },
    ],
  };
  selectNode(nodeData: { name: string; title: string }) {
    alert(`Hi All. I'm ${nodeData.name}. I'm a ${nodeData.title}.`);
  }
}
