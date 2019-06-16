import { IsNotEmpty } from 'class-validator';

export class StudentDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly group: string;
}
