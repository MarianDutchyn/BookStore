import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import {
  MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule,
  MatSelectModule, MatSlideToggleModule, MatListModule, MatCardModule, MatDialogModule
} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatSlideToggleModule, MatListModule, MatCardModule, MatDialogModule],
  exports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatSlideToggleModule, MatListModule, MatCardModule, MatDialogModule],
})
export class MaterialModule {

}
