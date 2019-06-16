import { Router } from '@angular/router';
import { lsTokenName } from '../../constants/constants';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Auth, AuthSuccess } from '../actions/auth.actions';
import * as authActions from './../actions/auth.actions';
import { of } from 'rxjs';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  auth$ = this.actions$.pipe(
    ofType<Auth>(authActions.AuthActionTypes.AUTH),
    switchMap(action =>
      this.authService.logIn(action.payload).pipe(
        map(authUser => new authActions.AuthSuccess(authUser)),
        tap((action: any) => {
          localStorage.setItem(lsTokenName, JSON.stringify(action.payload));
          if (action.payload.user.role === 'teacher') {
            this.router.navigateByUrl('/user/teacher');
            return true;
          }

          if (action.payload.user.role === 'student') {
            this.router.navigateByUrl('/user/student');
            return true;
          }

          if (action.payload.user.role === 'moderator') {
            this.router.navigateByUrl('/moderator');
            return true;
          }
        }),
        catchError(error => of(new authActions.AuthFail(error))),
      ),
    ),
  );
}
