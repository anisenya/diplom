import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TeacherDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly department: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;

  readonly cabinetNumber: number;
}
