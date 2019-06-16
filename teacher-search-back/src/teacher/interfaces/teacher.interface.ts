import { Document } from 'mongoose';

export interface Teacher extends Document {
  readonly name: string;
  readonly department: string;
  readonly status: boolean;
  readonly cabinetNumber: number;
}
