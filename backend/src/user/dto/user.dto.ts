import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";


export class CreateUserDto{

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsOptional()
    readonly walletAddress?: string;

}