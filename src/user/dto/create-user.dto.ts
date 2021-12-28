import { UserEntity } from './../entities/user.entity';
import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';

export class CreateUserDto {
  firstName?: string;

  lastName?: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(UserEntity, { message: 'Пользователь с таким email уже существует' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен быть минимум 6 символов' })
  password?: string;
}
