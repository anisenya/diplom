import { NgModule } from '@angular/core';
import {
  MatCardModule,
} from '@angular/material';

import {CommonModule} from '@angular/common';
import {TeacherCardComponent} from './teacher-card.component';

@NgModule({
  declarations: [TeacherCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [TeacherCardComponent]
})
export class TeacherCardModule { }
