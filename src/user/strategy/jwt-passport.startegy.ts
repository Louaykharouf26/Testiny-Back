import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable ,UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { userEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants} from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService:ConfigService,
    @InjectRepository(userEntity)
    private userRepository:Repository<userEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      
    });
  }

  async validate(payload: PayloadInterface) {

    const username = payload.username;
    const user = await this.userRepository.findOneBy({username});
    if (user){
      const {password,salt ,...result}=user;
      return result;
    }
    else {throw new UnauthorizedException()}
  }
}