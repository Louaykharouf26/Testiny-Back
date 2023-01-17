import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/strategy/constants';
import { recruiterEntity } from './entities/recruiter.entity';
import { RecruiterController } from './recruiter.controller';
import { RecruiterService } from './recruiter.service';

@Module({
  controllers: [RecruiterController],
  providers: [RecruiterService],
  imports:[TypeOrmModule.forFeature([recruiterEntity]),ConfigModule, PassportModule.register({
    defaultStrategy: 'jwt'
}),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
            expiresIn: 3600
        }

    })]
})
export class RecruiterModule {}
