import { Module } from '@nestjs/common';
import { TeamMemberController } from './controllers/team-member/team-member.controller';
import { TeamMemberService } from './services/team-member/team-member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMembers } from 'src/typeorm/entities/TeamMembers';
import { User } from 'src/typeorm/entities/User';
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
      TeamMembers,
      User,
      Team
    ])
  ],
  controllers: [TeamMemberController],
  providers: [TeamMemberService]
})
export class TeamMemberModule {}
