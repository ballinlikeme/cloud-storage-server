import {IsEmail, IsString, Length} from "class-validator";

export class UserLoginDto {
    @IsString({message: "Email Поле должно иметь тип string"})
    @IsEmail({}, {message: "Email Некорректный email"})
    readonly email: string;
    @IsString({message: "Password Поле должно иметь тип string"})
    @Length(5, 16, {message: "Password Минимальная длина пароля 5 символов, максимальная 16 символов"})
    readonly password: string;
}