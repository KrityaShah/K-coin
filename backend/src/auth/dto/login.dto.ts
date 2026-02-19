import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}