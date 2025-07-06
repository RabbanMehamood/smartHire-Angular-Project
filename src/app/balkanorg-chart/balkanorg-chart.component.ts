import { Component } from '@angular/core';
import OrgChart from "@balkangraph/orgchart.js";
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-balkanorg-chart',
  templateUrl: './balkanorg-chart.component.html',
  styleUrl: './balkanorg-chart.component.scss'
})
export class BalkanorgChartComponent {
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
    { name: 'Environmental Health and Safety' }
  ];
  

  ngOnInit() {
    const tree = document.getElementById('tree');

    OrgChart.templates['myTemplate'] = Object.assign({}, OrgChart.templates['ana']);
      
    OrgChart.templates['myTemplate'].size = [150, 70];
    OrgChart.templates['myTemplate'].node = '<rect width="140" height="60" x="5" y="5" rx="6" ry="6" fill="#21404c" />';

    OrgChart.templates['myTemplate'].ripple = {
      radius: 100,
      color: "#e6e6e6",
      rect: null
    };
    OrgChart.templates['myTemplate'].link = '<path stroke-linejoin="round" stroke="#21404c" stroke-width="2px" fill="none" d="{rounded}" />';

    
    OrgChart.templates['myTemplate']['field_0'] = '<text style="font-size: 14px;" fill="#ffffff" x="75" y="40" text-anchor="middle">{val}</text>';
    OrgChart.templates['myTemplate'].plus =
      `<rect x="0" y="-14" width="20" height="20" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect>
      <line x1="4" y1="-2" x2="16" y2="-2" stroke-width="1" stroke="#ffffff"></line> <line x1="10" y1="-8" x2="10" y2="4" stroke-width="1" stroke="#ffffff"></line>`; // Vertical line, white color
      

    OrgChart.templates['myTemplate'].minus =
      `<rect x="0" y="-14" width="20" height="20" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect>
      <line x1="4" y1="-2" x2="16" y2="-2" stroke-width="1" stroke="#ffffff"></line>`;

    OrgChart.templates['myTemplate'].expandCollapseSize = 16;

    OrgChart.templates['myTemplate'].nodeMenuButton =
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,126,8)" data-ctrl-n-menu-id="{id}">'
      + '<rect x="0" y="0" fill="#000000" fill-opacity="0" width="16" height="16"></rect>'
      + '<path fill="rgb(255, 202, 40)" d="M14.06,9.02l-1.42,-1.42l-5.69,5.69l1.42,1.42L14.06,9.02z M3.18,17.25l-0.02,-0.02l-1.07,-1.07L13.68,2.44c0.41,-0.41 1.07,-0.41 1.48,0l1.41,1.41c0.41,0.41 0.41,1.07 0,1.48L4.25,17.25l-1.07,-1.07z M14.36,4.09L13.91,3.64l1.42,-1.42l0.45,0.45l-1.42,1.42z" transform="scale(0.8) translate(0,0)"></path>'
      + '</g>';
    

      if (tree) {
        var chart = new OrgChart(tree, { 
          enableDragDrop: true,
          enableSearch: false,
          nodeBinding: {
            field_0: "name",
          },
          align: OrgChart.align.orientation,
          mouseScrool: OrgChart.action.ctrlZoom,
          template: 'myTemplate',
          nodeMenu: {
            add: { text: "Add" },
            edit: { text: "Edit" },
            remove: { text: "Remove"}
          },
        });

        chart.load([
          { id: 1, name: "Department", title: "CEO",},
          { id: 2, pid: 1, name: "Engineering", title: "Sales Manager",},
          { id: 3, pid: 1, name: "Sales", title: "Dev Manager", },
          { id: 4, pid: 1, name: "Pharma", title: "Sales" },
          { id: 5, pid: 1, name: "Advertisement", title: "Sales",  },
          { id: 6, pid: 1, name: "Marketing", title: "Developer" },
          { id: 7, pid: 1, name: "Finance", title: "Developer" }
        ]);
     
        chart.on('click', function (sender, args) {
          console.log(sender)
          const clickedNode = chart.get(args.node.id);
          console.log("Clicked node:", clickedNode); 
        });

  }
      }
    }
