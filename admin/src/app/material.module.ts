import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import {
  MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule,
  MatSelectModule, MatSlideToggleModule
} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule],
  exports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule],
})
export class MaterialModule {

}
