import { 
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Get,
    Patch,
    Delete,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    UseGuards
} from '@nestjs/common';
import { Role } from 'src/decorators/roles/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';
import { createTaskDTO } from 'src/task/dtos/CreateTask.dto';
import { updateTaskDTO } from 'src/task/dtos/UpdateTask.dto';
import { updateTaskStatusDTO } from 'src/task/dtos/UpdateTaskStatus.dto';
import { TaskService } from 'src/task/services/task/task.service';

@Controller('tasks')
export class TaskController {
    constructor(private taskService:TaskService){}

    @Role(['PM','TL'])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @Post('create')
    @UsePipes(new ValidationPipe())
    createTask(@Body() taskBody : createTaskDTO){
        const result = this.taskService.createTask(taskBody);
        return result;
    }

    @Role(['PM','TL'])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @Get()
    getTasks(){
        const result  = this.taskService.fetchTasks();
        return result;
    }

    @Role(['PM','TL'])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @Get(':taskId')
    getTaskById(@Param('taskId',ParseIntPipe) id: number){
        const result = this.taskService.getTasksById(id);
        return result;
    }

    @Role(['PM','TL'])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @Patch('update/:taskId')
    @UsePipes(new ValidationPipe())
    updateTask(@Param('taskId', ParseIntPipe) id:  number, @Body() taskBody: updateTaskDTO){
        if(Object.keys(taskBody).length === 0){
            throw new HttpException('Empty Body request is not allowed',HttpStatus.BAD_REQUEST);
        }
        const result = this.taskService.updateTask(id, taskBody);
        return result;
    }

    @Role(['PM','TL'])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @Delete('delete/:taskId')
    deleteTask(@Param('taskId',ParseIntPipe) id: number){
        const result = this.taskService.deleteTask(id);
        return result;
    }

    @Role(['PM','TL'])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @Get('tasksByTL/:TL_Id')
    getTasksByTLId(@Param('TL_Id', ParseIntPipe) TL_Id: number){
        const result = this.taskService.getTasksByTL(TL_Id);
        return result;
    }

    @Role(['PM','TL','D'])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @Get('tasksByUserId/:userId')
    getTasksByUserId(@Param('userId', ParseIntPipe) userId: number){
        const result = this.taskService.getTaskByUserId(userId);
        return result;
    }

    @Role(['PM','TL'])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @Patch('updateStatus')
    @UsePipes(new ValidationPipe())
    updateTaskStatus(@Body() taskStatus: updateTaskStatusDTO){
        const result = this.taskService.updateTaskStatus(taskStatus);
        return result;
    }
}
