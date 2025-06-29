import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';


let treeData=[{
  key: '0',
  label: 'Departments',
  data: 'Departments Folder',
  icon: 'pi pi-building',
  children: [
      {
          key: '0-0',
          label: 'Engineering',
          icon: 'pi pi-home',
          children: [
            { key: '0-0-0', label: 'Software Engineer', icon: 'pi pi-user', data: 'Expenses Document' },
            { key: '0-0-1', label: 'Software Analyst', icon: 'pi pi-user', data: 'Resume Document' },
            { key: '0-0-2', label: 'FrontEnd Developer',icon: 'pi pi-user' },
            { key: '0-0-2', label: 'Backend Developer', icon: 'pi pi-user'},
            { key: '0-0-2', label: 'Software Quality Assurance', icon: 'pi pi-user'}
          ]
      },
      {
          key: '0-1',
          label: 'Marketing',
          icon: 'pi pi-fw pi-home',
          children: [{ key: '0-1-0', label: '', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
    },
    {
      key: '0-2',
      label: 'Sales',
      icon: 'pi pi-home',
      children: [{ key: '0-2-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
  }
  ]
}]

@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrl: './empdashboard.component.scss'
})
  
export class EmpdashboardComponent {
  files!: TreeNode[];

  constructor() {}

  ngOnInit() {
      this.files = treeData
  }

  expandAll() {
      this.files.forEach((node) => {
          this.expandRecursive(node, true);
      });
  }

  collapseAll() {
      this.files.forEach((node) => {
          this.expandRecursive(node, false);
      });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
      node.expanded = isExpand;
      if (node.children) {
          node.children.forEach((childNode) => {
              this.expandRecursive(childNode, isExpand);
          });
      }
  }
}
