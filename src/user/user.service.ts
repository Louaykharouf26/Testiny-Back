import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-SignUp.dto';
import { userEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
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
}
