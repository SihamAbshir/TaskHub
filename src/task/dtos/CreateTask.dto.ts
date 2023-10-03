import { IsEnum, IsNotEmpty, IsNumber, IsString  } from "class-validator";
import { TaskStatus } from "src/typeorm/entities/Task";

export class createTaskDTO {
    @IsString()
    @IsNotEmpty()
    task_name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus;

    @IsNumber()
    @IsNotEmpty()
    project_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

}

