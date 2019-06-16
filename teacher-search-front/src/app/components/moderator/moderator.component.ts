import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '../../state/state';
import * as moderatorActions from '../../state/actions/moderator.actions';
import {MatSnackBar} from '@angular/material';
import {getAllUsers, getUsersError} from '../../state/selectors/moderator.selectors';
import {debounceTime, takeLast} from 'rxjs/operators';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {

  facultys = [
    {value: 'ФЭБУ'},
    {value: 'ФПТ'},
    {value: 'ФИТР'},
    {value: 'ФД'},
    
    
  ];

  departments = [
    {value: 'ИСАП'},
    {value: 'МАЛП'},
    {value: 'ТиОМП'},
    {value: 'ФиТМ'},
    
    
  ];

  public editorForm: FormGroup;
  public isTeacher: boolean;
  public users$ = this.store.select(getAllUsers);
  public error$ = this.store.select(getUsersError);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.editorForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      department: [''],
      faculty: ['']
    });

    this.editorForm.get('role').valueChanges.subscribe((value) => {
      if (value === 'teacher') {
        this.isTeacher = true;
        this.editorForm.get('department').setValidators(Validators.required);
        this.editorForm.get('faculty').setValidators(Validators.required);
      } else {
        this.isTeacher = false;
        this.editorForm.get('department').clearValidators();
        this.editorForm.get('faculty').clearValidators();
      }
    });
    this.store.dispatch(new moderatorActions.LoadUser());
  }

  public addUser(): void {
    this.store.dispatch(new moderatorActions.CreateUser(this.editorForm.value));
    this.error$.pipe(debounceTime(500)).subscribe(error => {
      if (error === null) {
        this.snackBar.open('Добавлено успешно', 'Закрыть', {
          duration: 2000,
        });
        this.editorForm.reset();
        Object.values(this.editorForm.controls).forEach(el => el.setErrors(null));
        this.cdr.markForCheck();
      } else {
        this.snackBar.open('Ошибка добавления', 'Закрыть', {
          duration: 2000,
        });
      }
    });
  }

  public removeUser(login: string): void {
    this.store.dispatch(new moderatorActions.RemoveUser(login));
    this.error$.pipe(debounceTime(200)).subscribe(error => {
      if (error === null) {
        this.snackBar.open('Пользователь удален', 'Закрыть', {
          duration: 2000,
        });
        this.editorForm.reset();
        Object.values(this.editorForm.controls).forEach(el => el.setErrors(null));
        this.cdr.markForCheck();
      } else {
        this.snackBar.open('Ошибка удаления', 'Закрыть', {
          duration: 2000,
        });
      }
    });
  }
  public logout(): void {
    this.authService.logOut();
  }
}
