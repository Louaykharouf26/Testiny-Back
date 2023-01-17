import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import { JwtStrategy } from './strategy/jwt-passport.startegy';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './strategy/constants';
import {MulterModule} from "@nestjs/platform-express";

@Module({
    controllers: [UserController],
    providers: [UserService,JwtStrategy],
    imports: [MulterModule.register({dest: './uploads'}),TypeOrmModule.forFeature([userEntity]),ConfigModule, PassportModule.register({
      defaultStrategy: 'jwt'
  }),
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
              expiresIn: 3600
          }

      })],
  })
export class UserModule {}
