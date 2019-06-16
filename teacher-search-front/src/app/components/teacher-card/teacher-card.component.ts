import {AfterViewChecked, ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Teacher} from '../../interfaces/app.interface';

@Component({
  selector: 'teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherCardComponent implements OnInit {

  @Input() teacher: Teacher
  constructor() { }

  ngOnInit() {
  }

}
