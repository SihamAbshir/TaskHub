import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project/project.controller';
import { ProjectService } from './services/project/project.service';
import { Project } from 'src/typeorm/entities/Project';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      Project
    ])
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
