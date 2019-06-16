import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AuthModule
} from './components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StudentModule} from './components/student/student.module';
import {TeacherModule} from './components/teacher/teacher.module';
import {authReducer} from './state/reducers/auth.reducers';
import {AuthEffects} from './state/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {TokenExpiredInterceptor} from './interceptors/token-expired.interceptor';
import {ModeratorEffects} from './state/effects/moderator.effects';
import {moderatorReducer} from './state/reducers/moderator.reducers';
import {ModeratorModule} from './components/moderator/moderator.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    StudentModule,
    TeacherModule,
    ModeratorModule,
    StoreModule.forRoot({
      auth: authReducer,
      moderator: moderatorReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ModeratorEffects
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpiredInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
