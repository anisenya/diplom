import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {AppService} from '../../services/app.service';
import {lsTokenName} from '../../constants/constants';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit, DoCheck {
  statuses = [
    {value: 'Свободен'},
    {value: 'Занят'},
    {value: 'Не в университе'}
  ];

  public teacherStatus: FormGroup;
  public isCabinetOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appService: AppService,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.teacherStatus = this.formBuilder.group({
      status: [''],
      housingNumber: [''],
      cabinetNumber: ['', [Validators.pattern('^[0-9]*$')]]
    });

    const {
      status,
      housingNumber,
      cabinetNumber
    } = JSON.parse(localStorage.getItem(lsTokenName)).user;

    this.teacherStatus.setValue({ status, housingNumber, cabinetNumber});
    this.teacherStatus.get('housingNumber').patchValue('' + housingNumber);

    this.teacherStatus.get('status').valueChanges.subscribe(data => {
      if (data === 'Не в университе') {
        this.teacherStatus.get('housingNumber').patchValue('');
        this.teacherStatus.get('housingNumber').disable();
        this.teacherStatus.get('cabinetNumber').patchValue('');
        this.teacherStatus.get('cabinetNumber').disable();
      } else {
        this.teacherStatus.get('housingNumber').enable();
        this.teacherStatus.get('cabinetNumber').enable();
      }
    });
  }

  ngDoCheck(): void {
    this.teacherStatus.get('status').updateValueAndValidity({
      onlySelf: false,
      emitEvent: true
    });
  }

  public update(): void {
    const {
      status,
      housingNumber,
      cabinetNumber
    } = this.teacherStatus.value;

    this.appService.updateUser({
      status,
      housingNumber: +housingNumber,
      cabinetNumber: +cabinetNumber
    }).subscribe(data => {
      localStorage.setItem(
        lsTokenName,
        JSON.stringify({
          token: JSON.parse(localStorage.getItem(lsTokenName)).token,
          user: data
        }));
    });
    this.snackBar.open('Статус сохранён', 'Закрыть', {
      duration: 2000,
    });
  }
  public logout(): void {
    this.authService.logOut();
  }

  public changeCabinetVisible(): void {
    this.isCabinetOpen = !this.isCabinetOpen;
  }
}
