import { Body, Controller, Post } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-SignUp.dto';
import { userEntity } from './entities/user.entity';
import { UserService } from './user.service';
import {LoginCredentialsDto} from "./dto/login-credentials.dto";

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Post('register')
    SignUp(@Body() userinfo:UserSignUpDto):Promise<userEntity>{
     return this.userService.SignUp(userinfo);
    }
    @Post('login')
    Login(@Body() credentials:LoginCredentialsDto):Promise<userEntity>{
        return this.userService.Login(credentials);
    }
}
