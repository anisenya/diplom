import { Document } from 'mongoose';

export interface Student extends Document {
  readonly name: string;
  readonly group: string;
}
