import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-SignUp.dto';
import { userEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserLoginDto} from "./dto/user-login.dto";
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
     delete user.salt;
     delete user.password;
     return user;
    }
   
    async login(creds:UserLoginDto):Promise<userEntity>{
        const {username,password}=creds;
        const user = await this.userRepository.createQueryBuilder("user")
        .where("user.username=:username or user.password=:password",{username,password}).getOne();
        if(!user) throw new NotFoundException("user not found check again the password and username");
        const hashedpass=await bcrypt.hash(password,user.salt);
        if(hashedpass===user.password)
        return{id: user.id, lastname: user.lastname, password: user.password, salt: user.salt,
            username: user.username,
            email:user.email,
            roles:user.roles}
            else {throw new NotFoundException(" password error")}
    } 
    

}
