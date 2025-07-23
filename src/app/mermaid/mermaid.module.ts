import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { MermaidRoutingModule } from './mermaid-routing.module';
import { MermaidComponent } from './mermaid.component';


@NgModule({
  declarations: [
    MermaidComponent
  ],
  imports: [
    CommonModule,
    MermaidRoutingModule,
    SharedModule
  ]
})
export class MermaidModule { }
