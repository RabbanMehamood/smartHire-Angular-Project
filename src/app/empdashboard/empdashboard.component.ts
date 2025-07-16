import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';

let treeData = [
  {
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
          {
            key: '0-0-0',
            label: 'Software Engineer',
            icon: 'pi pi-user',
            data: 'Expenses Document',
          },
          {
            key: '0-0-1',
            label: 'Software Analyst',
            icon: 'pi pi-user',
            data: 'Resume Document',
          },
          { key: '0-0-2', label: 'FrontEnd Developer', icon: 'pi pi-user' },
          { key: '0-0-2', label: 'Backend Developer', icon: 'pi pi-user' },
          {
            key: '0-0-2',
            label: 'Software Quality Assurance',
            icon: 'pi pi-user',
          },
        ],
      },
      {
        key: '0-1',
        label: 'Marketing',
        icon: 'pi pi-fw pi-home',
        children: [
          {
            key: '0-1-0',
            label: 'Digital Advertisement',
            icon: 'pi pi-fw pi-file',
            data: 'Invoices for this month',
          },
        ],
      },
      {
        key: '0-2',
        label: 'Sales',
        icon: 'pi pi-home',
        children: [
          {
            key: '0-2-0',
            label: 'Invoices.txt',
            icon: 'pi pi-fw pi-file',
            data: 'Invoices for this month',
          },
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrl: './empdashboard.component.scss',
})
export class EmpdashboardComponent implements AfterViewChecked {
  @ViewChild('heading') hElement: ElementRef;

  files!: TreeNode[];
  editNode: TreeNode | null = null;
  newChildLabel: string = '';

  ngOnInit() {
    this.files = treeData;
  }
  ngAfterViewChecked(): void {

    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.hElement.nativeElement.addEventListener('click', ($event) => {
      console.log($event.innerText);  
    });
  }

  expandAll() {
    this.files.forEach((node) => this.expandRecursive(node, true));
  }

  collapseAll() {
    this.files.forEach((node) => this.expandRecursive(node, false));
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((child) => this.expandRecursive(child, isExpand));
    }
  }

  onAddClick(node: TreeNode) {
    this.editNode = node;
    this.newChildLabel = '';
  }

  addChild(parentNode: TreeNode) {
    if (!this.newChildLabel.trim()) return;

    const newNode: TreeNode = {
      key: `${parentNode.key}-${parentNode.children?.length || 0}`,
      label: this.newChildLabel,
      icon: 'pi pi-user',
    };

    if (!parentNode.children) parentNode.children = [];
    parentNode.children.push(newNode);
    parentNode.expanded = true;

    this.cancelAdd();
  }

  cancelAdd() {
    this.editNode = null;
    this.newChildLabel = '';
  }
}
