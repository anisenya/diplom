import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';

import {checkValidFormGroup, FieldErrorChecker} from '../../utils/utils';
import {getAuthError} from '../../state/selectors/auth.selectors';
import {Router} from '@angular/router';
import {State} from '../../state/state';
import * as authActions from '../../state/actions/auth.actions';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public isFieldInvalid: FieldErrorChecker;
  public authForm: FormGroup;
  public authError$ = this.store.select(getAuthError);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<State>,
  ) {}

  public ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.isFieldInvalid = checkValidFormGroup(this.authForm);
  }

  public auth(): void {
    this.store.dispatch(new authActions.Auth(this.authForm.value));
  }
}
