import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalkanorgChartComponent } from './balkanorg-chart.component';

const routes: Routes = [{ path: '', component: BalkanorgChartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalkanorgChartRoutingModule { }
