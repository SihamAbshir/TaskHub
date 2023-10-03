import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString  } from "class-validator";
import { TaskStatus } from "src/typeorm/entities/Task";

export class updateTaskDTO {
    @IsOptional()    
    @IsString()
    @IsNotEmpty()
    task_name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status?: TaskStatus;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    project_id?:  {
        id : number
    };

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    user_id?:  {
        id : number
    };

}

