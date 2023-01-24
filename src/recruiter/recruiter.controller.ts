import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
//import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { RecruiterLoginDto } from './dto/recruiter-login.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

import { RecruiterSignUpDto } from './dto/recruiter-SignUp.dto';

import { recruiterEntity } from './entities/recruiter.entity';
import { RecruiterService } from './recruiter.service';

@Controller('recruiter')
export class RecruiterController {
    constructor(private recruiterService:RecruiterService){}
    @Post('register')
    SignUpRecruiter(@Body() recruiterinfo:RecruiterSignUpDto):Promise<recruiterEntity>{
    return this.recruiterService.SignUpRecruiter(recruiterinfo);
    }
    @Post('login')
    Login(@Body() userlogin:RecruiterLoginDto){
     return this.recruiterService.login(userlogin);
    }
   
    @Get('show')
    @UseGuards(JwtAuthGuard)
    findAll(@User() user) {
      return this.recruiterService.findAll(user);
    }
    @Get('showById/:id')
   async findById(@Param('id') id:number):Promise<RecruiterLoginDto>
    {return this.recruiterService.getUserById(id);}
    
}
