import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/user.decorator';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignUpDto } from './dto/user-SignUp.dto';
import { userEntity } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Post('register')
    SignUp(@Body() userinfo:UserSignUpDto):Promise<userEntity>{
     return this.userService.SignUp(userinfo);
    }
    @Post('login')
    Login(@Body() userlogin:UserLoginDto){
     return this.userService.login(userlogin);
    }
   
    @Get('show')
    @UseGuards(JwtAuthGuard)
    findAll(@User() user) {
      return this.userService.findAll(user);
    }
}


