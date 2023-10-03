import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team/team.controller';
import { TeamService } from './services/team/team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/typeorm/entities/Team';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:async (configService: ConfigService) =>  ( {
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn:  configService.get('expiresIn') },
      })
    }),
    TypeOrmModule.forFeature([
      Team
    ])
  ],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
