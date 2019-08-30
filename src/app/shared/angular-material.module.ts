import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule

  ],
  exports: [

    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]

})
export class AngularMaterialModule { }