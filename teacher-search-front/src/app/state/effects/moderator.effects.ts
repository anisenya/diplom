import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as moderatorActions from './../actions/moderator.actions';
import { of } from 'rxjs';
import {AppService} from '../../services/app.service';
import {CreateUser, LoadUser, RemoveUser} from '../actions/moderator.actions';
@Injectable()
export class ModeratorEffects {
  constructor(
    private actions$: Actions,
    private appService: AppService,
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<LoadUser>(moderatorActions.ModeratorActionTypes.LOAD_USER),
    switchMap(() =>
      this.appService.getUsers().pipe(
        map(user => new moderatorActions.LoadUserSuccess(user)),
        catchError(error => of(new moderatorActions.LoadUserFail())),
      ),
    ),
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType<CreateUser>(moderatorActions.ModeratorActionTypes.CREATE_USER),
    switchMap(action =>
      this.appService.createUser(action.payload).pipe(
        map(user => new moderatorActions.CreateUserSuccess(user)),
        catchError(error => of(new moderatorActions.CreateUserFail(error))),
      ),
    ),
  );

  @Effect()
  remove$ = this.actions$.pipe(
    ofType<RemoveUser>(moderatorActions.ModeratorActionTypes.REMOVE_USER),
    switchMap(action =>
      this.appService.removeUser(action.payload).pipe(
        map(user => new moderatorActions.RemoveUserSuccess(user)),
        catchError(error => of(new moderatorActions.RemoveUserFail(error))),
      ),
    ),
  );
}
