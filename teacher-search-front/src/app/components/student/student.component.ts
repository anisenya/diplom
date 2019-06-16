import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../services';
import {AppService} from '../../services/app.service';
import {concat, Observable, Subject} from 'rxjs';
import {Teacher} from '../../interfaces/app.interface';
import {debounce, debounceTime, delay, map, switchMap, take, tap} from 'rxjs/operators';
import {MatPaginator, MatPaginatorIntl} from '@angular/material';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open',
        style({
          zIndex: 100,
          height: '*',
          visibility: 'visible',
        }),
      ),
      state('closed',
        style({
          zIndex: 0,
          height: 0,
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.05s')]),
      transition('closed => open', [animate('0.05s')]),
    ]),
  ],
})
export class StudentComponent implements OnInit {

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

  public filters: FormGroup;
  public isFilters = false;
  public isSearch = false;
  public teachers$: Observable<Teacher[]>;
  public search = new FormControl('');
  public teacherCount$: Observable<number>;
  public data: any;
  public substring: string;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private appSerivce: AppService,
              private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.filters = this.formBuilder.group({
      department: [''],
      faculty: ['']
    });
    this.filters.valueChanges
      .pipe(
        switchMap((data) => {
          this.teachers$ = this.appSerivce.getTeachers('', data.faculty, data.department);
          return this.teachers$;
        }),
        tap(data => {
          if (this.filters.get('department').value === '' && this.filters.get('faculty').value === '') {
            this.teacherCount$ = this.appSerivce.getTeacherCount();
          } else {
            this.paginator.length = data.length;
          }
        })
      )
      .subscribe(() => {
        this.cdr.markForCheck();
      });

    this.teachers$ = this.appSerivce.getTeachers();
    this.teacherCount$ = this.appSerivce.getTeacherCount();

    this.paginator.page.subscribe(data => {
      this.teachers$ = this.appSerivce.getTeachers(this.substring, '', '', 5, data.pageIndex);
      this.cdr.markForCheck();
    });

    this.search.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((substring) => {
          this.substring = substring;
          this.teachers$ = this.appSerivce.getTeachers(substring);
          return this.teachers$;
        }),
        tap(data => {
          if (this.substring.length) {
            this.paginator.length = data.length;
          } else {
            this.teacherCount$ = this.appSerivce.getTeacherCount();
          }
        })
      )
      .subscribe(() => {
        this.cdr.markForCheck();
    });
  }

  public changeSearchStatus(): void {
    this.isSearch = !this.isSearch;
    if (!this.isSearch) {
      this.search.setValue('');
      this.substring = '';
    }
  }
  public changeFiltersStatus(): void {
    this.isFilters = !this.isFilters;
  }
  public logout(): void {
    this.authService.logOut();
  }
}
