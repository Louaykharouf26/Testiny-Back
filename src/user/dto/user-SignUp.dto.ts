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
 @IsEmail()
 email:string;
 @IsNotEmpty()
 @IsNotEmpty()
 lastname:string;
@IsNotEmpty()
password:string;

}