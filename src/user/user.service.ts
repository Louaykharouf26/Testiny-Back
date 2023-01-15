import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-SignUp.dto';
import { userEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {LoginCredentialsDto} from "./dto/login-credentials.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(userEntity)
        private userRepository:Repository<userEntity>
    ){}
  async SignUp(userinfo:UserSignUpDto): Promise<userEntity> {
    
    const user = this.userRepository.create({...userinfo});
    user.salt= await bcrypt.genSalt();
    user.password= await bcrypt.hash(user.password,user.salt);
    try{
        await this.userRepository.save(user);

    }
    catch (e){throw new ConflictException('password and user name should be unique')} 


     return user;
    }
    async Login(credentials: LoginCredentialsDto) : Promise<userEntity> {
        const  {username, password}= credentials;
        const  user = await  this.userRepository.createQueryBuilder("user")
            .where("user.username = :username or user.password = :password",
                {username,password}
                )
            .getOne();
        if (!user)
            throw new  NotFoundException('incorrect username or password');
        const hashedPassword = await bcrypt.hash(password,user.salt);
        if (hashedPassword === user.password) {
            return {
                id: user.id, lastname: user.lastname, password: user.password, salt: user.salt,
                username: user.username,
                email:user.email,
                roles:user.roles
            }
        } else {
            throw new  NotFoundException('incorrect username or password');
        }
    }
}
