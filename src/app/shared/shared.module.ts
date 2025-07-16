import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './header/header.component';
import { SearchSortPipePipe } from './pipes/search-sort-pipe.pipe';
import { SalaryHightlightDirective } from './directives/salary-hightlight.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchSortPipePipe,
    SalaryHightlightDirective,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ToastModule,
    RouterModule,
  ],
  exports: [HeaderComponent, SearchSortPipePipe, SalaryHightlightDirective],
  providers: [SearchSortPipePipe, SalaryHightlightDirective],
})
export class SharedModule {}
