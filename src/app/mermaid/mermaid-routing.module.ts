import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MermaidComponent } from './mermaid.component';

const routes: Routes = [{ path: '', component: MermaidComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MermaidRoutingModule { }
