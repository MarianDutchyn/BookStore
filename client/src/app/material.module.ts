import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import {
  MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule,
  MatSelectModule, MatSlideToggleModule, MatTabsModule, MatCardModule, MatProgressSpinnerModule,
  MatPaginatorModule, MatTableModule
} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatSelectModule,
    MatSlideToggleModule, MatTabsModule, MatCardModule, MatProgressSpinnerModule, MatPaginatorModule, MatTableModule],
  exports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatSelectModule,
    MatSlideToggleModule, MatTabsModule, MatCardModule, MatProgressSpinnerModule, MatPaginatorModule, MatTableModule],
})
export class MaterialModule {

}
