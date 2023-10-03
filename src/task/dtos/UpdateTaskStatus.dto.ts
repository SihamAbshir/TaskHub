import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength,  } from "class-validator";
import { TaskStatus } from "src/typeorm/entities/Task";

export class updateTaskStatusDTO {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus;
}

