import { ConflictException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {RecruiterSignUpDto} from './dto/recruiter-SignUp.dto';
import { recruiterEntity } from './entities/recruiter.entity';
import * as bcrypt from 'bcrypt';
import {RecruiterLoginDto} from './dto/recruiter-login.dto'
import {JwtService} from "@nestjs/jwt";
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { userEntity } from 'src/user/entities/user.entity';
@Injectable()
export class RecruiterService {
    constructor(
        @InjectRepository(recruiterEntity)
        
        private userRepository:Repository<recruiterEntity>,
        private  jwtService: JwtService
    ){}
  async SignUpRecruiter(recruiterinfo:RecruiterSignUpDto): Promise<recruiterEntity> {
    
    const user = this.userRepository.create({...recruiterinfo});
    
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
   
    async login(creds:RecruiterLoginDto) {
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
                    id:user.id,
                    lastname:user.lastname,
                    role : user.roles,
                "access_token": jwt
            };
        }
        else {throw new NotFoundException(" password error")}
    }
    async findAll(user): Promise<recruiterEntity[]> {
        return this.userRepository.find(user);
        
      }
      async getUserById(id: number): Promise<RecruiterLoginDto>{
        const userId = await this.userRepository.findOneBy({ id: id });
        console.log(userId,id);
    
    if (!userId) {
      throw new NotFoundException();
    }
    return userId;
        
      }

      
}



