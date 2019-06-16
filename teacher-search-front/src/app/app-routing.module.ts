import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {WithoutAuthGuard} from './guards/without-auth.guard';
import {TeacherComponent} from './components/teacher/teacher.component';
import {WithAuthGuard} from './guards/with-auth.guard';
import {StudentComponent} from './components/student/student.component';
import {ModeratorComponent} from './components/moderator/moderator.component';

const routes: Routes = [
  { path: 'moderator', component: ModeratorComponent, canActivate: [WithAuthGuard]},
  { path: 'user/teacher', component: TeacherComponent, canActivate: [WithAuthGuard]},
  { path: 'user/student', component: StudentComponent, canActivate: [WithAuthGuard]},
  { path: 'auth', component: AuthComponent, canActivate: [WithoutAuthGuard] },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
