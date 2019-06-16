import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule, MatRadioModule,
  MatSelectModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CommonModule} from '@angular/common';
import {TeacherCardModule} from '../teacher-card/teacher-card.module';
import {ModeratorComponent} from './moderator.component';

@NgModule({
  declarations: [ModeratorComponent],
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
    MatRadioModule,
    MatSnackBarModule,
    MatCardModule
  ],
  exports: [ModeratorComponent]
})
export class ModeratorModule { }
