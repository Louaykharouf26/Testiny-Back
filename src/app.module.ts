import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { RecruiterModule } from './recruiter/recruiter.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'projetnest',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),UserModule, RecruiterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
