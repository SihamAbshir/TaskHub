import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task/task.controller';
import { TaskService } from './services/task/task.service';
import { Task } from 'src/typeorm/entities/Task';
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
      Task
    ])
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
