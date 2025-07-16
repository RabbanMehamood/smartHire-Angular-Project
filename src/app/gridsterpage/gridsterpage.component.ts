import { Component } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { EmployeeserviceService } from '../employee/service/employeeservice.service';

@Component({
  selector: 'app-gridsterpage',
  templateUrl: './gridsterpage.component.html',
  styleUrl: './gridsterpage.component.scss',
})
export class GridsterpageComponent {
  visible: boolean = false;
  widgetLabel: string = '';
  widgetInfo: string = '';

  showDialog() {
    this.visible = true;
  }

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  constructor(private empService: EmployeeserviceService) {}

  ngOnInit(): void {
    this.empService.getUsers().subscribe({
      next: (res: {}) => {
        console.log(res);
        this.dashboard[0]['data'] = {
          labels: ['A', 'B', 'C'],
          datasets: [
            {
              data: [540, 325, 702],
              backgroundColor: ['green', 'orange', 'brown'],
            },
          ],
        };
        this.dashboard[0]['options'] = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: '#000000',
              },
            },
          },
        };
      },
    });

    this.options = {
      fixedColWidth: 115,
      fixedRowHeight: 85,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      mobileBreakpoint: 640,
      useBodyForBreakpoint: false,
      pushItems: true,
      rowHeightRatio: 0.8,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
    };

    this.dashboard = [
      {
        cols: 2,
        rows: 3,
        y: 0,
        x: 0,
        label: 'Employee Pie-chart',
        info: 'Displaying Pie-chart',
        data: {},
        options: {},
      },
      { cols: 1, rows: 2, y: 0, x: 1, label: 'widget 2' },
      { cols: 1, rows: 2, y: 2, x: 5, label: 'widget 3' },
      { cols: 1, rows: 2, y: 1, x: 0, label: 'widget 4' },
      { cols: 1, rows: 2, y: 1, x: 0, label: 'widget 5' },
      {
        cols: 2,
        rows: 2,
        y: 3,
        x: 0,
        minItemRows: 2,
        minItemCols: 2,
        label: 'widget 6',
        info: 'Min rows & cols = 2',
      },
      {
        cols: 2,
        rows: 2,
        y: 2,
        x: 0,
        maxItemRows: 2,
        maxItemCols: 2,
        label: 'widget 7',
        infro: 'Max rows & cols = 2',
      },
      {
        cols: 2,
        rows: 1,
        y: 2,
        x: 2,
        dragEnabled: true,
        resizeEnabled: true,
        label: 'widget8',
        info: 'Drag&Resize Enabled',
      },
      {
        cols: 1,
        rows: 1,
        y: 2,
        x: 4,
        dragEnabled: false,
        resizeEnabled: false,

        label: 'widget 7',
        info: 'Drag&Resize Disabled',
      },
      { cols: 1, rows: 1, y: 2, x: 6 },
    ];
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    console.log(item);
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    debugger;
    let widgetObject = {
      x: 0,
      y: 0,
      cols: 2,
      rows: 2,
      label: this.widgetLabel,
      info: this.widgetInfo,
    };
    this.dashboard.push(widgetObject);
    this.widgetInfo = '';
    this.widgetLabel = '';
    this.visible = false;
  }
}
