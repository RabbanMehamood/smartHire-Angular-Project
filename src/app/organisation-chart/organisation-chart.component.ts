import { Component, OnInit } from '@angular/core';
import OrgChart from 'orgchart.js/src/orgchart.js';

@Component({
  selector: 'app-organisation-chart',
  templateUrl: './organisation-chart.component.html',
  styleUrl: './organisation-chart.component.scss',
})
export class OrganisationChartComponent implements OnInit {
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

  ngOnInit(): void {
    const datasource = {
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

    function closest(el: any, fn: any): any {
      return (
        el &&
        (fn(el) && el !== document.querySelector('.orgchart')
          ? el
          : closest(el.parentNode, fn))
      );
    }

    function getId() {
      return new Date().getTime() * 1000 + Math.floor(Math.random() * 1001);
    }

    function clickNode(event: any) {
      const sNode = closest(event.target, (el: any) =>
        el.classList?.contains('node')
      );
      const sNodeInput = document.getElementById(
        'selected-node'
      ) as HTMLInputElement;
      sNodeInput.value = sNode?.querySelector('.title')?.textContent || '';
      (sNodeInput.dataset as any)['node'] = sNode?.id || '';
    }

    function clickChart(event: any) {
      const target = event.target as HTMLElement;
      if (!closest(target, (el: any) => el.classList?.contains('node'))) {
        const input = document.getElementById(
          'selected-node'
        ) as HTMLInputElement;
        input.value = '';
      }
    }

    function toggleViewState(this: HTMLInputElement) {
      const chart = document.querySelector('.orgchart');
      chart?.classList.toggle('view-state', this.value !== 'view');
      document
        .getElementById('edit-panel')
        ?.classList.toggle('view-state', this.value === 'view');

      if (this.value === 'edit') {
        chart
          ?.querySelectorAll('tr')
          .forEach((tr) => tr.classList.remove('hidden'));
        chart
          ?.querySelectorAll('td')
          .forEach((td) => td.classList.remove('hidden'));
        chart
          ?.querySelectorAll('.node')
          .forEach((node) =>
            node.classList.remove(
              'slide-up',
              'slide-down',
              'slide-right',
              'slide-left'
            )
          );
      } else {
        (document.getElementById('btn-reset') as HTMLButtonElement)?.click();
      }
    }

    function toggleNodeType(this: HTMLInputElement) {
      const panel = document.getElementById('edit-panel');
      if (this.value === 'parent') {
        panel?.classList.add('edit-parent-node');
        const list = document.getElementById('new-nodelist');
        Array.from(list?.children || [])
          .slice(1)
          .forEach((el) => el.remove());
      } else {
        panel?.classList.remove('edit-parent-node');
      }
    }

    function addInputs() {
      const newNode = document.createElement('li');
      newNode.innerHTML = `<input type="text" class="new-node">`;
      document.getElementById('new-nodelist')?.appendChild(newNode);
    }

    function removeInputs() {
      const inputs = document.getElementById('new-nodelist')?.children;
      if (inputs && inputs.length > 1) {
        inputs[inputs.length - 1].remove();
      }
    }

    function addNodes(orgchart: any) {
      const nodeVals: string[] = [];
      const newNodes = document.querySelectorAll('.new-node');
      newNodes.forEach((input) => {
        const val = (input as HTMLInputElement).value.trim();
        if (val) nodeVals.push(val);
      });

      const selectedInput = document.getElementById(
        'selected-node'
      ) as HTMLInputElement;
      const selectedId = (selectedInput.dataset as any)['node'];
      const selectedNode = document.getElementById(selectedId || '');

      const chartContainer = document.getElementById('chart-container');
      const nodeType = document.querySelector(
        'input[name="node-type"]:checked'
      ) as HTMLInputElement;

      if (!nodeVals.length) {
        alert('Please input value for new node');
        return;
      }

      if (!nodeType) {
        alert('Please select a node type');
        return;
      }

      if (nodeType.value === 'parent') {
        if (!chartContainer?.children.length) {
          orgchart = new OrgChart({
            chartContainer: '#chart-container',
            data: { name: nodeVals[0] },
            parentNodeSymbol: 'fa-th-large',
            createNode: (node: any, data: any) => {
              node.id = getId();
            },
          });
          orgchart.chart.classList.add('view-state');
        } else {
          orgchart.addParent(chartContainer.querySelector('.node'), {
            name: nodeVals[0],
            Id: getId(),
          });
        }
      } else if (nodeType.value === 'siblings') {
        orgchart.addSiblings(selectedNode, {
          siblings: nodeVals.map((val) => ({
            name: val,
            relationship: '110',
            Id: getId(),
          })),
        });
      } else {
        const td = selectedNode?.parentElement as HTMLTableCellElement;
        const hasChild = td?.colSpan && td.colSpan > 1;
        const rel = nodeVals.length > 1 ? '110' : '100';

        if (!hasChild) {
          orgchart.addChildren(selectedNode, {
            children: nodeVals.map((val) => ({
              name: val,
              relationship: rel,
              Id: getId(),
            })),
          });
        } else {
          const baseNode = closest(
            selectedNode,
            (el: any) => el.nodeName === 'TABLE'
          )
            ?.querySelector('.nodes')
            ?.querySelector('.node');
          orgchart.addSiblings(baseNode, {
            siblings: nodeVals.map((val) => ({
              name: val,
              relationship: '110',
              Id: getId(),
            })),
          });
        }
      }
    }

    function deleteNodes(orgchart: any) {
      const sNodeInput = document.getElementById(
        'selected-node'
      ) as HTMLInputElement;
      const sNodeId = (sNodeInput.dataset as any)['node'];
      const sNode = document.getElementById(sNodeId || '');

      if (!sNode) {
        alert('Please select a node to delete');
        return;
      }

      orgchart.removeNodes(sNode);
      sNodeInput.value = '';
      (sNodeInput.dataset as any)['node'] = '';
    }

    function resetPanel() {
      const fNode = document.querySelector('.orgchart .focused');
      fNode?.classList.remove('focused');

      const selectedNode = document.getElementById(
        'selected-node'
      ) as HTMLInputElement;
      selectedNode.value = '';

      const input = document
        .getElementById('new-nodelist')
        ?.querySelector('input') as HTMLInputElement;
      if (input) input.value = '';

      const list = document.getElementById('new-nodelist');
      Array.from(list?.children || [])
        .slice(1)
        .forEach((item) => item.remove());

      document.querySelectorAll('#node-type-panel input').forEach((el) => {
        (el as HTMLInputElement).checked = false;
      });
    }

    function bindEventHandler(
      selector: string,
      type: string,
      fn: any,
      parentSelector?: string
    ) {
      const parent = parentSelector
        ? document.querySelector(parentSelector)
        : null;
      if (parent) {
        parent.addEventListener(type, function (event: any) {
          if (
            event.target.classList?.contains(selector.slice(1)) ||
            closest(event.target, (el: any) =>
              el.classList?.contains(selector.slice(1))
            )
          ) {
            fn.call(event.target, event);
          }
        });
      } else {
        document.querySelectorAll(selector).forEach((el) => {
          el.addEventListener(type, fn);
        });
      }
    }

  
    let orgchart: any;

    orgchart = new OrgChart({
      chartContainer: '#chart-container',
      data: datasource,
      nodeContent: 'title',
      parentNodeSymbol: 'fa-users',
      draggable: true,
      createNode: function (node: any, data: any) {
        node.id = getId();
      },
    });

    bindEventHandler('.node', 'click', clickNode, '#chart-container');
    bindEventHandler('.orgchart', 'click', clickChart, '#chart-container');
    bindEventHandler('input[name="chart-state"]', 'change', toggleViewState);
    bindEventHandler('input[name="node-type"]', 'change', toggleNodeType);
    document
      .getElementById('btn-add-input')
      ?.addEventListener('click', addInputs);
    document
      .getElementById('btn-remove-input')
      ?.addEventListener('click', removeInputs);
    document
      .getElementById('btn-add-nodes')
      ?.addEventListener('click', () => addNodes(orgchart));
    document
      .getElementById('btn-delete-nodes')
      ?.addEventListener('click', () => deleteNodes(orgchart));
    document.getElementById('btn-reset')?.addEventListener('click', resetPanel);
  }
}
