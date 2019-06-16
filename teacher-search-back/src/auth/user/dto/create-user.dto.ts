import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly login: string;

  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  readonly avatarUrl: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly secondName: string;

  readonly lastName: string;

  readonly faculty: string;

  readonly department: string;
}
