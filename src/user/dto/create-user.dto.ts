import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  first_name?: string;

  last_name?: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен быть минимум 6 символов' })
  password?: string;
}
