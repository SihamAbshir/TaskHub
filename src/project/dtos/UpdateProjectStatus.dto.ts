import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength,  } from "class-validator";
import { ProjectStatus } from "src/typeorm/entities/Project";

export class updateProjectStatusDTO {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsEnum(ProjectStatus)
    @IsNotEmpty()
    status: ProjectStatus;
}

