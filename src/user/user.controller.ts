import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignUpDto } from './dto/user-SignUp.dto';
import { userEntity } from './entities/user.entity';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Post('register')
    SignUp(@Body() userinfo:UserSignUpDto):Promise<userEntity>{
     return this.userService.SignUp(userinfo);
    }
    @Post('login')
    Login(@Body() userlogin:UserLoginDto):Promise<userEntity>{
     return this.userService.login(userlogin);
    }
}
