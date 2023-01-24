import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { jwtConstants } from './strategy/constants';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  await app.listen(3000);
  const corsoption ={
    origin:['http://localhost:3001'],optionsSuccessStatus: 200
  }
  app.use(
    session({
      secret: jwtConstants.secret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors(corsoption);
}
bootstrap();
