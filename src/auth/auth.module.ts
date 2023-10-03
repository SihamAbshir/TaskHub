import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { ConfigService } from '@nestjs/config'; 


@Module({
  imports: [
    UsersModule,
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.JWT_SECRET,
    //   signOptions: { expiresIn:  jwtConstants.JWT_SECRET_EXPIRY },
    // }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:async (configService: ConfigService) =>  ( {
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn:  configService.get('expiresIn') },
      })
    }),
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
