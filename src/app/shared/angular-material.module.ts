import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
@NgModule({
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatRadioModule
  ],
  exports: [

    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatRadioModule
  ],

})
export class AngularMaterialModule { }