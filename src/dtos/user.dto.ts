import { IsEmail, IsString, Length } from "class-validator";

export class UserDto {
  @IsString({ message: "Поле должно иметь тип string" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
  @IsString({ message: "Поле должно иметь тип string" })
  @Length(5, 16, {
    message: "Минимальная длина пароля 5 символов, максимальная 16 символов",
  })
  readonly password: string;
  @IsString({ message: "Поле должно иметь тип string" })
  @Length(2, undefined, { message: "Минимальная длина имени 2 символа" })
  readonly name: string;
  readonly imageUrl?: string;
}
