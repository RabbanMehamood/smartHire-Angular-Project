import { Component } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { EmployeeserviceService } from '../employee/service/employeeservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-gridsterpage',
  templateUrl: './gridsterpage.component.html',
  styleUrl: './gridsterpage.component.scss',
})
export class GridsterpageComponent {
  widgetForm!: FormGroup;

  visible: boolean = false;

  chartWidth: string = '250px';
  chartHeight: string = '250px';

  showDialog() {
    this.visible = true;
  }

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  constructor(
    private empService: EmployeeserviceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.widgetForm = this.fb.group({
      widgetLabel: ['', Validators.required],
      widgetInfo: ['', Validators.required],
    });

    this.empService.getUsers().subscribe({
      next: (res: {}) => {
        console.log(res);
        this.dashboard[0]['data'] = {
          labels: [
            'Engineering',
            'Sales',
            'Advertisement',
            'Marketing',
            'Finance',
          ],
          datasets: [
            {
              label: 'Department',
              data: [90, 45, 70, 55, 600],
              backgroundColor: [
                'Green',
                'Teal',
                'Brown',
                'SteelBlue',
                'MidnightBlue',
              ],
            },
          ],
        };
        this.dashboard[0]['options'] = {
          layout: {
            margin: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 150,
            },
          },
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#495057',
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
        id: 1,
        cols: 2,
        rows: 3,
        y: 0,
        x: 0,
        label: 'Employee Pie-chart',
        info: 'Percentage of Employees',
        data: {},
        options: {},
      },
      {
        id: 2,
        cols: 1,
        rows: 2,
        y: 0,
        x: 1,
        label: 'widget 2',
        info: 'details of widget2',
      },
      {
        id: 3,
        cols: 1,
        rows: 2,
        y: 2,
        x: 5,
        label: 'widget 3',
        info: 'details of widget3',
      },
      {
        id: 4,
        cols: 1,
        rows: 2,
        y: 1,
        x: 0,
        label: 'widget 4',
        info: 'details of widget4',
      },
      {
        id: 5,
        cols: 1,
        rows: 2,
        y: 1,
        x: 0,
        label: 'widget 5',
        info: 'details of widget5',
      },
      {
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
        cols: 1,
        rows: 1,
        y: 2,
        x: 4,
        dragEnabled: false,
        resizeEnabled: false,
        label: 'widget 7',
        info: 'Drag&Resize Disabled',
      },
      {
        id: 10,
        cols: 1,
        rows: 1,
        y: 2,
        x: 6,
        label: 'widget 9',
        info: 'Widget 9 is the last child of the ',
      },
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

  addWidget(): void {
    if (this.widgetForm.valid) {
      console.log('Form Submitted:', this.widgetForm.value.widgetLabel);
      let index = this.dashboard.findIndex(
        (item) => item['label'] === this.widgetForm.value.widgetLabel
      );
      if (index === -1) {
        this.dashboard.push({
          x: 0,
          y: 0,
          cols: 2,
          rows: 2,
          label: this.widgetForm.value.widgetLabel,
          info: this.widgetForm.value.widgetInfo,
        });
        this.visible = false;
      } else {
        let editedWidget = this.dashboard[index];
        editedWidget['info'] = this.widgetForm.value.widgetInfo;
        this.dashboard.splice(index, 1, editedWidget);
        this.visible = false;
      }
    } else {
      console.log('Form is invalid');
    }
  }
  editWidget(widgetDetail) {
    this.widgetForm.patchValue({
      widgetLabel: widgetDetail.label,
      widgetInfo: widgetDetail.info,
    });
    this.visible = true;
  }

  cancel() {
    this.widgetForm.reset();
    this.visible = false;
  }
  resized(event) {
    console.log(event.item['id']);
    if (event.item['id'] === 1) {
      // console.log(event.itemComponent.height);
      this.chartHeight = `${event.itemComponent.height / 1.1}px`;
      // console.log(this.chartHeight);
      this.chartWidth = `${event.itemComponent.width / 2.8}px`;
      let chart = document.getElementById('chart');
      chart.children[0]['style']['height'] = `${
        event.itemComponent.height / 1.5
      }px`;
    }
    // console.log(chart.children[0]['style']['height']);
  }
}
