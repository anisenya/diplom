import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StudentComponent} from './student.component';
import {CommonModule} from '@angular/common';
import {TeacherCardModule} from '../teacher-card/teacher-card.module';

@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    TeacherCardModule,
    MatPaginatorModule,
  ],
  exports: [StudentComponent]
})
export class StudentModule { }
