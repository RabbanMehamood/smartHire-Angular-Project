import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridsterpageComponent } from './gridsterpage.component';

const routes: Routes = [{ path: '', component: GridsterpageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridsterpageRoutingModule { }
