import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import mermaid from 'mermaid';

@Component({
  selector: 'app-mermaid',
  templateUrl: './mermaid.component.html',
  styleUrls: ['./mermaid.component.scss'],
})
export class MermaidComponent implements AfterViewInit {
  @ViewChild('mermaidDiv', { static: true }) mermaidDiv!: ElementRef;

  ngAfterViewInit(): void {
    // Initialize mermaid once
    mermaid.initialize({
      startOnLoad: false,
      flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'cardinal' },
      securityLevel: 'loose',
    });

    const graphDefinition = `
      graph LR  
        A[Christmas] -->|Get money| B(Go shopping)
        B --> C(Let me think)
        C -->|One| D[Laptop]
        C -->|Two| E[iPhone]
        C -->|Three| F[fa:fa-car Car]
        click D "https://www.amazon.com" "Go to Laptop Page"
        click E callback "Buy iPhone"
    `;

    const container = this.mermaidDiv.nativeElement;

    // Use renderAsync to avoid type issues
    mermaid
      .render('graphDiv', graphDefinition)
      .then(({ svg, bindFunctions }) => {
        container.innerHTML = svg;
        if (typeof bindFunctions === 'function') {
          bindFunctions(container); // Bind click events etc.
        }
      });
  }
}
