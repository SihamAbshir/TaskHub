import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength,  } from "class-validator";
import { ProjectStatus } from "src/typeorm/entities/Project";

export class updateProjectDTO {

    @IsOptional()
    @IsString()
    project_name?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;

    @IsOptional()
    @IsNumber()
    assigned_PM?: {
        id : number
    };

    @IsOptional()
    @IsNumber()
    assigned_team?:  {
        id : number
    };
}

