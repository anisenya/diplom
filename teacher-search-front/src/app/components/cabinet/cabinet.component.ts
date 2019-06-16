import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {AppService} from '../../services/app.service';
import {lsTokenName} from '../../constants/constants';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  public authForm: FormGroup;
  public avatarUrl: FormControl;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      login: [{value: '', disabled: true}, []],
      password: ['', [Validators.required, Validators.min(5)]],
    });

    this.avatarUrl = new FormControl('');
    const { login } = JSON.parse(localStorage.getItem(lsTokenName)).user;
    this.authForm.get('login').setValue(login);
  }

  public updatePassword(): void {
    this.appService.updateUserData({
      login: this.authForm.get('login').value,
      password: this.authForm.get('password').value
    }).subscribe();
    this.snackBar.open('Пароль изменён', 'Закрыть', {
      duration: 2000,
    });
  }

  public updateAvatar(): void {
    this.appService.updateUser({
      avatarUrl: this.avatarUrl.value
    }).subscribe();
    this.snackBar.open('Фотография изменена', 'Закрыть', {
      duration: 2000,
    });
  }

}
