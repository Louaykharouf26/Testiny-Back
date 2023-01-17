import {IsNotEmpty} from "class-validator";

export class RecruiterLoginDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}