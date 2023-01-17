import {
    IsNotEmpty,
    MinLength,
    ValidationArguments,
    MaxLength,
    IsEmail,
  } from 'class-validator';
import { UserRoleEnum } from 'src/enums/user-role.enum';
export class RecruiterSignUpDto {
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