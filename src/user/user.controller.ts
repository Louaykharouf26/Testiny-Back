import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
    @Get('showById/:id')
   async findById(@Param('id') id:number):Promise<UserLoginDto>
    {return this.userService.getUserById(id);}
    @Get('count/:id')
    async count(@Param('id') id):Promise<[userEntity[],number]>
     {return this.userService.getUserByRole(id);}
     @Delete('deletebyid/:id')
  remove(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }
     @Post('upload')
     @UseInterceptors(
         FileInterceptor('file',{
         storage: diskStorage({
             destination:'src/uploads',
             filename: (req, file, callback) => {
                 const uniqueSuffix =
                     Date.now()+'-'+Math.round(Math.random()*1e9);
                 const path = require("path");
                 const ext = path.extname(file.originalname);
                 const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
                 callback(null,filename);
             },
         }),
     }),
     )
     uploadFile(@UploadedFile() file){
         console.log(file)
     }
     @Get(':filepath')
     seeUplodedFile(@Param('filepath') file, @Res() res){
         res.sendFile(file, {root:'src/uploads'});
         
     }
 }



