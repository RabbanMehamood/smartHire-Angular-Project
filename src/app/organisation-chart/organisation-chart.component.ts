import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import OrgChart from 'orgchart.js/src/orgchart.js';

let datasource = {
  name: 'Lao Lao',
  title: 'general manager',
  children: [
    { name: 'Bo Miao', title: 'department manager' },
    {
      name: 'Su Miao',
      title: 'department manager',
      children: [
        { name: 'Tie Hua', title: 'senior engineer' },
        {
          name: 'Hei Hei',
          title: 'senior engineer',
          children: [
            { name: 'Pang Pang', title: 'engineer' },
            { name: 'Xiang Xiang', title: 'UE engineer' },
          ],
        },
      ],
    },
    { name: 'Yu Jie', title: 'department manager' },
    { name: 'Yu Li', title: 'department manager' },
    { name: 'Hong Miao', title: 'department manager' },
    { name: 'Yu Wei', title: 'department manager' },
    { name: 'Chun Miao', title: 'department manager' },
    { name: 'Yu Tie', title: 'department manager' },
  ],
};

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

  ds = datasource;

  ajaxURLs = {
    children: '/orgchart/children/',
    parent: '/orgchart/parent/',
    siblings: function (nodeData) {
      return '/orgchart/siblings/' + nodeData.id;
    },
    families: function (nodeData) {
      return '/orgchart/families/' + nodeData.id;
    },
  };

  ngOnInit() {
    var orgchart = new OrgChart({
      chartContainer: '#chart-container',
      data: this.ds,
      ajaxURL: this.ajaxURLs,
      direction: 't2b',
      nodeContent: 'title',
      nodeId: 'id',
      depth: 10,
      toggleSiblingsResp: true,
      pan: true,
      zoom: true,
      draggable: true,
      parentNodeSymbol: 'fa-users',
    });
  }
}
