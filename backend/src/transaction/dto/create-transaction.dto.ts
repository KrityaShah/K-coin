import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {

    @IsNotEmpty()
    @IsString()
    readonly recipient: string;

    @IsNumber()
    @IsPositive()
    readonly amount: number;
}