import { Document } from 'mongoose';

export interface User extends Document {
  readonly login: string;
  readonly password: string;
  readonly info?: UserInfo;
}

export interface Teacher {
  readonly faculty: string;
  readonly department: string;
  readonly status: string;
  readonly housingNumber: number;
  readonly cabinetNumber: number;
}

export interface UserInfo extends Document {
  readonly login: string;
  readonly role: string;
  readonly lastName: string;
  readonly secondName: string;
  readonly firstName: string;
  readonly teacher?: Teacher;
}
