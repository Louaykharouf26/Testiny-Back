import {
    IsNotEmpty,
    MinLength,
    ValidationArguments,
    MaxLength,
    IsEmail,
  } from 'class-validator';
export class UserSignUpDto {
 @IsNotEmpty()
 username:string;
 @IsNotEmpty()
 @IsEmail()
 email:string;
 @IsNotEmpty()
 lastname:string;
@IsNotEmpty()
password:string;
}