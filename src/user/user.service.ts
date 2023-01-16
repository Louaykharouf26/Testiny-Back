import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-SignUp.dto';
import { userEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserLoginDto} from "./dto/user-login.dto";
import {JwtService} from "@nestjs/jwt";
import { UserRoleEnum } from 'src/enums/user-role.enum';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(userEntity)
        private userRepository:Repository<userEntity>,
        private  jwtService: JwtService
    ){}
  async SignUp(userinfo:UserSignUpDto): Promise<userEntity> {
    
    const user = this.userRepository.create({...userinfo});
    
    user.salt= await bcrypt.genSalt();
    user.password= await bcrypt.hash(user.password,user.salt);
    try{
        await this.userRepository.save(user);
    }
    catch (e){throw new ConflictException('email should be unique')} 
     delete user.salt;
     delete user.password;
     return user;
    }
   
    async login(creds:UserLoginDto) {
        const {email, password} = creds;
        const user = await this.userRepository.createQueryBuilder("user")
            .where("user.email=:email or user.password=:password", {email, password}).getOne();
        if (!user) throw new NotFoundException("user not found check again the password and username");
        const hashedpass = await bcrypt.hash(password, user.salt);
        if (hashedpass === user.password) {
            const payload = {
                username: user.username,
                email: user.email,
                roles: user.roles
            };
            const jwt = this.jwtService.sign(payload);
            return {username:user.username,
                    email:user.email,
                    lastname:user.lastname,
                    role : user.roles,
                "access_token": jwt
            };
        }
        else {throw new NotFoundException(" password error")}
    }
    async findAll(user): Promise<userEntity[]> {
        return this.userRepository.find(user);
        //return `This action returns all cv`;
      }
}



