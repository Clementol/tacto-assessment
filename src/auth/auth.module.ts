import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from 'src/shared/src';
import { AuthController } from './auth.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User]), Repository,
  JwtModule.register({
    global: true,
    secret: appConfig().auth.jwtsecretkey,
    signOptions: { expiresIn: '5m' },
    verifyOptions: { maxAge: '7d' },
    
  }),
],
  providers: [AuthResolver, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
